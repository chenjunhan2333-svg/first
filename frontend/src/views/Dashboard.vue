<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ stats.totalUsers }}</div>
            <div class="stat-label">用户总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ stats.activeUsers }}</div>
            <div class="stat-label">活跃用户</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="stat-item">
            <div class="stat-value">{{ stats.adminUsers }}</div>
            <div class="stat-label">管理员</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>系统说明</span>
        </div>
      </template>
      <div class="info-content">
        <p>
          <strong>欢迎使用高纯石英矿石图像分类系统！</strong>
        </p>
        <p>当前版本为基础版本，包含以下功能：</p>
        <ul>
          <li>用户认证与权限管理</li>
          <li>用户信息管理</li>
          <li>系统基础架构</li>
        </ul>
        <p style="color: #909399; margin-top: 20px">
          <el-icon><InfoFilled /></el-icon>
          <strong>提示：</strong>系统已预留扩展接口，便于后续添加更多功能模块。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { getUserStats } from '@/api/users'

const authStore = useAuthStore()

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  adminUsers: 0,
})

const loadStats = async () => {
  try {
    const data = await getUserStats()
    stats.value = {
      totalUsers: data.total_users,
      activeUsers: data.active_users,
      adminUsers: data.admin_users,
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  }
}

onMounted(() => {
  loadStats()
})

// 当页面被激活时（从其他页面返回时）刷新统计数据
onActivated(() => {
  loadStats()
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.info-content {
  line-height: 1.8;
}

.info-content ul {
  margin: 10px 0;
  padding-left: 20px;
}
</style>



