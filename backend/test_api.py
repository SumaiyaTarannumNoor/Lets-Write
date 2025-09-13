import requests
import json

def test_api():
    url = "http://localhost:5000/api/generate"
    
    # Test data
    data = {
        "prompt": "Once upon a time",
        "length": 100
    }
    
    print("Testing API...")
    print(f"URL: {url}")
    print(f"Data: {data}")
    
    try:
        # Method 1: Using json parameter (sets Content-Type automatically)
        print("\n--- Method 1: Using requests.post with json parameter ---")
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("SUCCESS!")
            return
            
    except Exception as e:
        print(f"Method 1 failed: {e}")
    
    try:
        # Method 2: Manual headers
        print("\n--- Method 2: Manual headers ---")
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url, data=json.dumps(data), headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"Method 2 failed: {e}")

if __name__ == "__main__":
    test_api()