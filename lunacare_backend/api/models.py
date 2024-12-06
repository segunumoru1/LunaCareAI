from django.db import models

class ApiDemoModel(models.Model):
    message = models.CharField(max_length=200)


