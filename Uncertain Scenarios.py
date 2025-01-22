import random
import json
import time

# --- Constants ---
WIN_THRESHOLD = 3
LOSE_THRESHOLD = 7
MAX_PLAYERS = 10
MIN_PLAYERS = 4

# --- Data Loading Functions ---

def load_categories():
    try:
        with open("data/categories.json", "r") as f:
            categories = json.load(f)
        return categories
    except FileNotFoundError:
        print("Error: categories.json file not found.")
        return {}

def load_tokens():
    try:
        with open("data/tokens.json", "r") as f:
            tokens = json.load(f)
        return tokens
    except FileNotFoundError:
        print("Error: tokens.json file not found.")
        return []

def load_ai_agents():
    try:
        with open("data/ai_agents.json", "r") as f:
            ai_agents = json.load(f)
        return ai_agents
    except FileNotFoundError:
        print("Error: ai_agents.json file not found.")
        return {}

# --- Load Data ---
CATEGORIES = load_categories()
TOKENS = load_tokens()
AI_AGENTS = load_ai_agents()

# --- Game State Class ---
class GameState:
    # Updated to include current_round and players_for_round for card flip
    def __init__(self, players):
        self.players = players  # List of Player objects (including AI)
        self.current_category = None
        self.current_question = None
        self.current_scale = None
        self.current_player_index = 0
        self.correct_answers = 0
        self.wrong_answers = 0
        self.board_position = 0  # Represents progress on the board
        self.obstacles = []
        self.current_round = 0
        self.players_for_round = []

    def get_current_player(self):
        return self.players[self.current_player_index]
    
    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict