"""
用户管理API测试
"""
import pytest
from fastapi import status


def test_create_user_as_admin(client, admin_token):
    """测试管理员创建用户"""
    response = client.post(
        "/api/v1/users",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "full_name": "New User",
            "role": "user",
        },
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["username"] == "newuser"
    assert data["email"] == "newuser@example.com"
    assert data["role"] == "user"


def test_create_user_as_regular_user(client, user_token):
    """测试普通用户无法创建用户"""
    response = client.post(
        "/api/v1/users",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
        },
        headers={"Authorization": f"Bearer {user_token}"},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert "仅管理员可以创建用户" in response.json()["detail"]


def test_create_user_unauthorized(client):
    """测试未授权创建用户"""
    response = client.post(
        "/api/v1/users",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_list_users_as_admin(client, admin_token, test_user):
    """测试管理员获取用户列表"""
    response = client.get(
        "/api/v1/users",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_list_users_as_regular_user(client, user_token):
    """测试普通用户无法获取用户列表"""
    response = client.get(
        "/api/v1/users",
        headers={"Authorization": f"Bearer {user_token}"},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert "仅管理员可以查看用户列表" in response.json()["detail"]


def test_get_user_stats(client, user_token, test_user, test_admin):
    """测试获取用户统计数据"""
    response = client.get(
        "/api/v1/users/stats",
        headers={"Authorization": f"Bearer {user_token}"},
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "total_users" in data
    assert "active_users" in data
    assert "admin_users" in data
    assert data["total_users"] >= 2
    assert data["admin_users"] >= 1


def test_delete_user_as_admin(client, admin_token, test_user):
    """测试管理员删除普通用户"""
    user_id = test_user.id
    response = client.delete(
        f"/api/v1/users/{user_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT

    # 验证用户已被删除
    response = client.get(
        "/api/v1/users",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    users = response.json()
    user_ids = [u["id"] for u in users]
    assert user_id not in user_ids


def test_delete_user_as_regular_user(client, user_token, test_user):
    """测试普通用户无法删除用户"""
    user_id = test_user.id
    response = client.delete(
        f"/api/v1/users/{user_id}",
        headers={"Authorization": f"Bearer {user_token}"},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_delete_nonexistent_user(client, admin_token):
    """测试删除不存在的用户"""
    response = client.delete(
        "/api/v1/users/99999",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "用户不存在" in response.json()["detail"]


def test_delete_self(client, admin_token, test_admin):
    """测试管理员无法删除自己"""
    admin_id = test_admin.id
    response = client.delete(
        f"/api/v1/users/{admin_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "不能删除自己的账号" in response.json()["detail"]


def test_delete_admin_user(client, admin_token, test_admin):
    """测试无法删除管理员账号"""
    # 创建另一个管理员
    response = client.post(
        "/api/v1/users",
        json={
            "username": "admin2",
            "email": "admin2@example.com",
            "password": "admin123",
            "role": "admin",
        },
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    admin2_id = response.json()["id"]

    # 尝试删除管理员
    response = client.delete(
        f"/api/v1/users/{admin2_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "不能删除管理员账号" in response.json()["detail"]
