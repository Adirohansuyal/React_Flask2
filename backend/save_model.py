import pickle
from sklearn.linear_model import LinearRegression
import numpy as np

# Extended training data: [area, bedrooms, bathrooms]
X = np.array([
    [800, 1, 1],
    [950, 2, 1],
    [1100, 2, 2],
    [1250, 3, 2],
    [1400, 3, 2],
    [1600, 3, 2],
    [1700, 4, 3],
    [1800, 4, 2],
    [2000, 4, 3],
    [2200, 5, 3],
    [2400, 5, 4],
    [2600, 6, 4],
    [3000, 5, 3],
    [3200, 6, 4],
    [3500, 6, 5],
])

# Corresponding house prices
y = np.array([
     80000,   # 800 sq ft, 1 bed, 1 bath
     95000,   # 950 sq ft, 2 bed, 1 bath
    110000,
    130000,
    145000,
    160000,
    175000,
    180000,
    200000,
    220000,
    240000,
    270000,
    300000,
    330000,
    360000,
])

# Train the model
model = LinearRegression()
model.fit(X, y)

# Save the model
pickle.dump(model, open('model.pkl', 'wb'))

print("Model trained and saved as model.pkl")
