from django.contrib import admin
from .models import Subject, Course, Paper

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code', 'subject']


@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code', 'course', 'file']
