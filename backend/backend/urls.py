from django.contrib import admin
from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    # for subjects
    path('api/subjects/', views.SubjectListCreate.as_view(), name='subject-list'),
    path('api/subjects/<int:pk>/', views.SubjectDetail.as_view(), name='subject-detail'),

    # for courses
    path('api/courses/', views.CourseListCreate.as_view(), name='course-list'),
    path('api/courses/<int:pk>/', views.CourseDetail.as_view(), name='course-detail'),

    # for papers
    path('api/papers/', views.PaperListCreate.as_view(), name='paper-list'),
    path('api/papers/<int:pk>/', views.PaperDetail.as_view(), name='paper-detail'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)    