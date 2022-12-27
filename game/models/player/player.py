from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #和每个用户一一对应
    photo = models.URLField(max_length=256, blank=True) #头像
    openid = models.CharField(default="", max_length=50, blank=True, null=True) #openid

    def __str__(self):
        return str(self.user)
