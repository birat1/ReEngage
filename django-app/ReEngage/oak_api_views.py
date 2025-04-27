from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ReEngage.oak_api_services import (
    get_units,
    get_lessons,
    get_lesson_asset,
    get_lesson_summary,
    get_questions,
)

class UnitsAPI(APIView):
    def get(self, request, keystage, subject, year):
        units = get_units(keystage, subject, year)
        if not units:
            return Response({"error": "No units found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(units, status=status.HTTP_200_OK)
    
class LessonsAPI(APIView):
    def get(self, request, keystage, subject, unit):
        lessons = get_lessons(keystage, subject, unit)
        if not lessons:
            return Response({"error": "No lessons found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(lessons, status=status.HTTP_200_OK)
    
class LessonAssetAPI(APIView):
    def get(self, request, lesson, asset_type):
        asset = get_lesson_asset(lesson, asset_type)
        
        if asset.status_code == 200:
            content_type = asset.headers.get('Content-Type', 'application/octet-stream')
            
            if asset_type == 'video':
                response = StreamingHttpResponse(asset.iter_content(chunk_size=8192), content_type=content_type)
                response['Content-Disposition'] = f'inline; filename="{lesson}.mp4"'
            else:
                response = StreamingHttpResponse(asset.iter_content(chunk_size=8192), content_type=content_type)
                response['Content-Disposition'] = f'inline; filename="{lesson}.pdf"'

            return response
        else:
            return Response({'error': 'Failed to fetch the file from third-party API'}, status=status.HTTP_400_BAD_REQUEST)
    
class LessonSummaryAPI(APIView):
    def get(self, request, lesson):
        summary = get_lesson_summary(lesson)
        if not summary:
            return Response({"error": "No summary found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(summary, status=status.HTTP_200_OK)
    
class QuestionsAPI(APIView):
    def get(self, request, keystage, subject):
        questions = get_questions(keystage, subject)
        if not questions:
            return Response({"error": "No questions found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(questions, status=status.HTTP_200_OK)
