
# models.py
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    due_date = models.DateField()
    estimated_hours = models.IntegerField()
    importance = models.IntegerField()
    dependencies = models.JSONField(default=list)
    
    priority_score = models.FloatField(null=True, blank=True)
    explanation = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title
