

# Create your tests here.
from django.test import TestCase
from scorping import calculate_priority_score

from datetime import date

class PriorityScoreTests(TestCase):
    def test_high_importance_boosts_score(self):
        task = {
            "title": "Test",
            "due_date": date.today(),
            "estimated_hours": 2,
            "importance": 10,
            "dependencies": []
        }
        score, _ = calculate_priority_score(task)
        self.assertTrue(score > 20)

    def test_dependencies_increase_score(self):
        task = {
            "title": "Test",
            "due_date": date.today(),
            "estimated_hours": 3,
            "importance": 5,
            "dependencies": [1,2]
        }
        score, _ = calculate_priority_score(task)
        self.assertTrue(score > 10)

    def test_effort_low_means_high_score(self):
        task = {
            "title": "Test",
            "due_date": date.today(),
            "estimated_hours": 1,
            "importance": 5,
            "dependencies": []
        }
        score, _ = calculate_priority_score(task)
        self.assertTrue(score > 15)
