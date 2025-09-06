import torch
import torch.nn as nn
import torch.nn.functional as F

# -----------------------------
# Define the LSTM model
# -----------------------------
class CharLSTM(nn.Module):
    def __init__(self, vocab_size, hidden_size, num_layers=2):
        super(CharLSTM, self).__init__()
        self.lstm = nn.LSTM(vocab_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, vocab_size)

    def forward(self, x, hidden=None):
        out, hidden = self.lstm(x, hidden)
        out = self.fc(out[:, -1, :])  # only last timestep
        return out, hidden


# -----------------------------
# Sampling helpers
# -----------------------------
def sample_with_temperature(probs, temperature=1.0):
    if temperature <= 0:
        return torch.argmax(probs).item()
    logp = torch.log(probs + 1e-9) / temperature
    p = torch.exp(logp)
    p /= p.sum()
    return torch.multinomial(p, 1).item()


def top_k_sampling(probs, k=50):
    top_p, top_idx = torch.topk(probs, k)
    top_p /= top_p.sum()
    choice = torch.multinomial(top_p, 1).item()
    return top_idx[choice].item()


def top_p_sampling(probs, p=0.9):
    sorted_p, sorted_idx = torch.sort(probs, descending=True)
    cum_p = torch.cumsum(sorted_p, dim=0)
    mask = cum_p <= p
    mask[0] = True
    filtered_p = sorted_p[mask] / sorted_p[mask].sum()
    filtered_idx = sorted_idx[mask]
    choice = torch.multinomial(filtered_p, 1).item()
    return filtered_idx[choice].item()


# -----------------------------
# Dummy vocab + model
# Replace with your trained vocab + model checkpoint
# -----------------------------
vocab = list("abcdefghijklmnopqrstuvwxyz .,!?")
char_to_idx = {c: i for i, c in enumerate(vocab)}
idx_to_char = {i: c for i, c in enumerate(vocab)}

vocab_size = len(vocab)
hidden_size = 128
model = CharLSTM(vocab_size, hidden_size)
model.eval()


# -----------------------------
# Text generation function
# -----------------------------
def generate_text(start_seq, length=300, temperature=0.8, top_k=None, top_p=None, max_context=100):
    result = start_seq
    input_seq = torch.tensor([[char_to_idx.get(c, 0) for c in start_seq]], dtype=torch.long)

    hidden = None
    with torch.no_grad():
        for _ in range(length):
            # Trim context if too long
            if input_seq.size(1) > max_context:
                input_seq = input_seq[:, -max_context:]

            # One-hot encode
            x = F.one_hot(input_seq, num_classes=len(vocab)).float()
            out, hidden = model(x, hidden)

            # Convert logits to probabilities
            probs = torch.softmax(out[0], dim=-1)

            # Apply temperature sampling
            idx = sample_with_temperature(probs, temperature)

            # Apply top-k or top-p if provided
            if top_k:
                idx = top_k_sampling(probs, top_k)
            if top_p:
                idx = top_p_sampling(probs, top_p)

            next_char = idx_to_char[idx]
            result += next_char

            # Append new token
            next_idx = torch.tensor([[idx]])
            input_seq = torch.cat([input_seq, next_idx], dim=1)

    return result
