from django.conf.urls import include, url
from core import views



urlpatterns = [
    url(r'^$',views.home),
    url(r'^receber/$', views.receberDados)
]