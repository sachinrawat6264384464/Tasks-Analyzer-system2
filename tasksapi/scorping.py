from datetime import date

def calculate_priority_score(task):
   
    # 1. Urgency
    days_left = (task['due_date'] - date.today()).days
    urgency_score = 10 - days_left

    # 2. Importance
    importance_score = task['importance'] * 2

    # 3. Effort (quick wins)
    effort_score = 10 / task['estimated_hours'] if task['estimated_hours'] > 0 else 0

    # 4. Dependencies
    dependency_score = len(task['dependencies']) * 3

    # Final score
    score = urgency_score + importance_score + effort_score + dependency_score

    # Explanation string
    explanation = []

    if days_left < 0:
        explanation.append("Past due, very urgent")
    elif days_left <= 3:
        explanation.append("Due soon (high urgency)")
    
    if task['importance'] >= 7:
        explanation.append("High importance")
    
    if task['estimated_hours'] <= 2:
        explanation.append("Low effort quick win")
    
    if len(task['dependencies']) > 0:
        explanation.append(f"Blocks {len(task['dependencies'])} tasks")

    # -------------------------------
    # NEW: Feedback influence
    # -------------------------------

    return score, ", ".join(explanation)
