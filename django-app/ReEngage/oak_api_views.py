from django.http import HttpRequest, StreamingHttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ReEngage.oak_api_services import (
    get_lesson_asset,
    get_lesson_summary,
    get_lessons,
    get_questions,
    get_units,
)


class UnitsAPI(APIView):
    def get(self, request: HttpRequest, keystage: str, subject: str, year: int) -> Response:
        units = get_units(keystage, subject, year)
        if not units:
            return Response({"error": "No units found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(units, status=status.HTTP_200_OK)


class LessonsAPI(APIView):
    def get(self, request: HttpRequest, keystage: str, subject: str, unit: str) -> Response:
        lessons = get_lessons(keystage, subject, unit)
        if not lessons:
            return Response({"error": "No lessons found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(lessons, status=status.HTTP_200_OK)


class LessonAssetAPI(APIView):
    def get(self, request: HttpRequest, lesson: str, asset_type: str) -> StreamingHttpResponse:
        asset = get_lesson_asset(lesson, asset_type)

        if asset.status_code == 200:
            content_type = asset.headers.get("Content-Type", "application/octet-stream")

            if asset_type == "video":
                response = StreamingHttpResponse(asset.iter_content(chunk_size=8192), content_type=content_type)
                response["Content-Disposition"] = f'inline; filename="{lesson}.mp4"'
            else:
                response = StreamingHttpResponse(asset.iter_content(chunk_size=8192), content_type=content_type)
                response["Content-Disposition"] = f'inline; filename="{lesson}.pdf"'

            return response
        return Response({"error": "Failed to fetch the file from third-party API"}, status=status.HTTP_400_BAD_REQUEST)


class LessonSummaryAPI(APIView):
    def get(self, request: HttpRequest, lesson: str) -> Response:
        summary = get_lesson_summary(lesson)
        if not summary:
            return Response({"error": "No summary found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(summary, status=status.HTTP_200_OK)


class QuestionsAPI(APIView):
    def get(self, request: HttpRequest, keystage: str, subject: str) -> Response:
        questions = get_questions(keystage, subject)
        if not questions:
            return Response({"error": "No questions found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(questions, status=status.HTTP_200_OK)
