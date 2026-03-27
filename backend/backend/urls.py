from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # for subjects
    path('subjects/', views.SubjectListCreate.as_view(), name='subject-list'),
    path('subjects/<int:pk>/', views.SubjectDetail.as_view(), name='subject-detail'),

    # for courses
    path('courses/', views.CourseListCreate.as_view(), name='course-list'),
    path('courses/<int:pk>/', views.CourseDetail.as_view(), name='course-detail'),

    # for papers
    path('papers/', views.PaperListCreate.as_view(), name='paper-list'),
    path('papers/<int:pk>/', views.PaperDetail.as_view(), name='paper-detail'),
]
