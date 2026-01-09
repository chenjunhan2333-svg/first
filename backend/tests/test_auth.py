"""
认证API测试
"""
import pytest
from fastapi import status


def test_register_success(client):
    """测试用户注册成功"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "full_name": "New User",
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == "newuser"
    assert data["email"] == "newuser@example.com"
    assert data["role"] == "user"
    assert "id" in data
    assert "hashed_password" not in data


def test_register_duplicate_username(client, test_user):
    """测试注册重复用户名"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "testuser",
            "email": "different@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "用户名已存在" in response.json()["detail"]


def test_register_duplicate_email(client, test_user):
    """测试注册重复邮箱"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "differentuser",
            "email": "test@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "邮箱已被注册" in response.json()["detail"]


def test_login_success(client, test_user):
    """测试登录成功"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "testpass123"},
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, test_user):
    """测试错误密码登录"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "wrongpassword"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "用户名或密码错误" in response.json()["detail"]


def test_login_nonexistent_user(client):
    """测试不存在的用户登录"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "nonexistent", "password": "password123"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "用户名或密码错误" in response.json()["detail"]


def test_get_current_user(client, user_token):
    """测试获取当前用户信息"""
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {user_token}"},
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "hashed_password" not in data


def test_get_current_user_unauthorized(client):
    """测试未授权获取用户信息"""
    response = client.get("/api/v1/auth/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_current_user_invalid_token(client):
    """测试无效token获取用户信息"""
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer invalid_token"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

