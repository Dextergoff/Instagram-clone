from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)


class UserManager(BaseUserManager):
    
    def create_user(self, username, email, password=None):

        if not email:
            raise ValueError('Users must have an email address')

    
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def update_password(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
            
        user = self.get(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        max_length=225,
        error_messages={"unique":"This email has already been registered."}
    )
    username = models.CharField(max_length=225, unique=True)
    description = models.CharField(max_length=225, blank=True, null=True)
    pfp = models.ImageField(default='c0c216b3743c6cb9fd67ab7df6b2c330.jpg')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    resetkey = models.CharField(max_length=255, blank=True, null=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
