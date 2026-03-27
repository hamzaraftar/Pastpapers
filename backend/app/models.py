from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='subject_courses')

    def __str__(self):
        return self.name

class Paper(models.Model):
    name = models.CharField(max_length=100)    
    code = models.CharField(max_length=20)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_papers')
    file = models.FileField(upload_to='papers/')

    def __str__(self):
        return self.name