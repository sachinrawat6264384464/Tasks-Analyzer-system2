from rest_framework.response import Response
from rest_framework.decorators import api_view 
from serializers import TaskInputSerializer 
from scorping import calculate_priority_score 
from datetime import datetime
from django.test import TestCase
from .models import Task

from datetime import date
@api_view(['POST'])
def analyze_tasks(request):
    serializer = TaskInputSerializer(data=request.data, many=True)

    if not serializer.is_valid():
        return Response({"error": serializer.errors}, status=400)

    tasks = serializer.validated_data
    scored_tasks = []

    for task_data in tasks:
        score, explanation = calculate_priority_score(task_data)

        # Save to DB
        task = Task(
            title=task_data["title"],
            due_date=task_data["due_date"],
            estimated_hours=task_data["estimated_hours"],
            importance=task_data["importance"],
            dependencies=task_data["dependencies"],
            priority_score=score,
            explanation=explanation
        )
        task.save()

        scored_tasks.append({
            **task_data,
            "priority_score": score,
            "explanation": explanation
        })

    # Sort by score (desc)
    scored_tasks.sort(key=lambda x: x['priority_score'], reverse=True)

    return Response(scored_tasks)
@api_view(['GET'])
def suggest_tasks(request):
    tasks = Task.objects.all().values()
    return Response(list(tasks))
