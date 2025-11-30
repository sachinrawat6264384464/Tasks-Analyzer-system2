
# models.py
from django.db import models



class Task(models.Model):
  
    title = models.CharField(max_length=200)
    due_date = models.DateField()
    estimated_hours = models.FloatField()
    importance = models.IntegerField()
    dependencies = models.TextField(blank=True, null=True)
    priority_score = models.FloatField(blank=True, null=True)
    explanation = models.TextField(blank=True, null=True)
    feedback_helpful = models.BooleanField(null=True, blank=True)


    def __str__(self):
        return self.title

