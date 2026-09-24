"""URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/

Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

"""

from django.contrib import admin
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from ReEngage.oak_api_views import (
    LessonAssetAPI,
    LessonsAPI,
    LessonSummaryAPI,
    QuestionsAPI,
    UnitsAPI,
)
from ReEngage.views import (
    admin_reset_password,
    apiAdmin,
    apiAvatar,
    apiStudent,
    check_streak,
    current_equipped_avatar,
    equip_avatar,
    get_students,
    get_user_info,
    login_user,
    logout_user,
    purchase_avatar,
    register_user,
    submit_contact_form,
)


@csrf_exempt
def get_csrf(request: object) -> JsonResponse:
    return JsonResponse({"csrfToken": get_token(request)})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("datawizard/", include("data_wizard.urls")),
    path("api/login/", login_user, name="login_user"),
    path("api/logout/", logout_user, name="logout_user"),
    path("api/csrf/", get_csrf, name="get_csrf"),
    path("api/register/", register_user, name="register_user"),
    # path('api/students/', apiStudent.as_view({'get':'list'}), name = 'listapistudents'),
    # path('api/students/', apiStudent.as_view({'post':'create'}), name = 'createapistudents'),
    path("api/students/", apiStudent.as_view({"get": "list", "post": "create"}), name="students"),
    path("api/students/<int:user_id>/", apiStudent.as_view({"get": "retrieve"}), name="viewapistudent"),
    path("api/students/<int:user_id>/delete/", apiStudent.as_view({"delete": "destroy"}), name="deleteapistudent"),
    path("api/students/<int:user_id>/edit/", apiStudent.as_view({"put": "update"}), name="editapistudent"),
    path("api/admins/", apiAdmin.as_view({"get": "list"}), name="listapiadmin"),
    path("api/admins/create/", apiAdmin.as_view({"post": "create"}), name="createapiadmin"),
    path("api/admins/<int:user_id>/", apiAdmin.as_view({"get": "retrieve"}), name="viewapiadmin"),
    path("api/admins/<int:user_id>/delete/", apiAdmin.as_view({"delete": "destroy"}), name="deleteapiadmin"),
    path("api/admins/<int:user_id>/update/", apiAdmin.as_view({"put": "update"}), name="editapiadmin"),
    path("api/avatar/", apiAvatar.as_view({"get": "list"}), name="listapiavatar"),  # ///Need more for avatar?
    path("api/avatar/<int:avatar_id>/", apiAvatar.as_view({"get": "retrieve"}), name="viewavatar"),
    path("api/avatar/<int:avatar_id>/update/", apiAvatar.as_view({"put": "update"}), name="editapiavatar"),
    # Routes for Oak OpenAPI
    path("api/oak/units/<str:keystage>/<str:subject>/<int:year>/", UnitsAPI.as_view(), name="oak-units"),
    path("api/oak/lessons/<str:keystage>/<str:subject>/<str:unit>/", LessonsAPI.as_view(), name="oak-lessons"),
    path("api/oak/lesson/<str:lesson>/summary/", LessonSummaryAPI.as_view(), name="oak-lesson-summary"),
    path("api/oak/lesson/assets/<str:lesson>/<str:asset_type>/", LessonAssetAPI.as_view(), name="oak-lesson-assets"),
    path("api/oak/questions/<str:keystage>/<str:subject>/", QuestionsAPI.as_view(), name="oak-questions"),
    # to return current logged in user
    path("api/current-user-info/", get_user_info, name="get_user_info"),
    # to return all the students managed by the current logged in admin
    path("api/get-students/", get_students, name="get_students"),
    # to return a student's current equipped avatar
    path("api/current-equipped-avatar/<int:user_id>/", current_equipped_avatar, name="current_equipped_avatar"),
    path("api/contact/", submit_contact_form, name="submit_contact_form"),
    # to check and update daily streak
    path("api/check-streak/", check_streak, name="check_streak"),
    # Purchase request from student
    path("api/purchase-avatar/", purchase_avatar, name="purchase_avatar"),
    path("api/equip-avatar/", equip_avatar, name="equip-avatar"),
    # Admin reset password
    path("api/reset-password/", admin_reset_password, name="admin_reset_password"),
]
