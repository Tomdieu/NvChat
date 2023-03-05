"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="NvChat API",
        default_version="v4.0.1",
        description="NvChat API Docs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(
            email="ivantomdio@gmail.com",
            name="ivantom",
            url="https://github.com/tomdieu",
        ),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

admin.site.site_header = "Nv Chat Admin"
admin.site.site_title = "Nv Chat Admin"
# admin.site.site_url = "https:trix-car-backend.vercel.app"
admin.site.index_title = "Nv Chat Administration"
admin.empty_value_display = "**Empty**"

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path("^nested_admin/", include("nested_admin.urls")),
    path(
        "api/",
        include(
            [
                path("chat/", include("chat.urls")),
                path("account/", include("account.urls")),
                path("friends/", include("friends.urls")),
                path("notifications/", include("notifications.urls")),
                path(
                    "docs/",
                    include(
                        [
                            re_path(
                                r"^swagger(?P<format>\.json|\.yaml)$",
                                schema_view.without_ui(cache_timeout=0),
                                name="schema-json",
                            ),
                            re_path(
                                r"^swagger/$",
                                schema_view.with_ui("swagger", cache_timeout=0),
                                name="schema-swagger-ui",
                            ),
                            re_path(
                                r"^redoc/$",
                                schema_view.with_ui("redoc", cache_timeout=0),
                                name="schema-redoc",
                            ),
                        ]
                    ),
                ),
            ]
        ),
    ),
    path("api-auth/", include("rest_framework.urls"), name="api-auth"),
    path("favicon.ico", lambda _: redirect("static/favicon.svg", permanent=True)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
