import torch
import torch.nn as nn
import pickle

# Load mappings
with open("model/vocab.pkl", "rb") as f:
    vocab = pickle.load(f)
with open("model/char_to_idx.pkl", "rb") as f:
    char_to_idx = pickle.load(f)
with open("model/idx_to_char.pkl", "rb") as f:
    idx_to_char = pickle.load(f)

# Define the CharLSTM model
class CharLSTM(nn.Module):
    def __init__(self, input_size, hidden_size=160, num_layers=6, num_classes=None):
        super(CharLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]  # Get the output of the last time step
        out = self.fc(out)
        return out

# Load the model
model = CharLSTM(input_size=len(vocab), hidden_size=160, num_layers=6, num_classes=len(vocab))  # Ensure these match your trained model
model.load_state_dict(torch.load("model/text_generator_model.pth"))
model.eval()

def generate_text(start_seq="The", length=300):
    model.eval()
         
    # Convert the input sequence to indexes
    input_seq = torch.tensor([char_to_idx[c] for c in start_seq], dtype=torch.long).unsqueeze(0)
    result = start_seq
     
    for _ in range(length):
        with torch.no_grad():
            # One-hot encode the input sequence and convert to float32
            input_seq_onehot = torch.nn.functional.one_hot(input_seq, num_classes=len(vocab)).float()
             
            # Pass the one-hot encoded input through the model
            output = model(input_seq_onehot)  # Remove the hidden unpacking here
                         
            # Apply softmax to get probabilities and sample from them
            probs = torch.nn.functional.softmax(output[-1], dim=0).cpu()
            next_char_idx = torch.multinomial(probs, 1).item()
            next_char = idx_to_char[next_char_idx]
         
        result += next_char
        input_seq = torch.tensor([[next_char_idx]], dtype=torch.long)
     
    return result



