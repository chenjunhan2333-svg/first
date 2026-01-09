# PowerShell 脚本 - 上传项目到 GitHub
# 编码: UTF-8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "项目上传到 GitHub 脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 设置 Git 用户信息
Write-Host "[1/6] 配置 Git 用户信息..." -ForegroundColor Yellow
git config user.name "chenjunhan2333-svg"
git config user.email "chenjunhan2333@gmail.com"
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: Git 用户信息配置失败" -ForegroundColor Red
    Read-Host "按 Enter 键退出"
    exit 1
}
Write-Host "✓ Git 用户信息配置成功" -ForegroundColor Green
Write-Host ""

# 更新远程仓库地址
Write-Host "[2/6] 更新远程仓库地址..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    git remote remove origin
}
git remote add origin https://github.com/chenjunhan2333-svg/first.git
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 远程仓库配置失败" -ForegroundColor Red
    Read-Host "按 Enter 键退出"
    exit 1
}
Write-Host "✓ 远程仓库地址已更新为: https://github.com/chenjunhan2333-svg/first.git" -ForegroundColor Green
Write-Host ""

# 添加所有更改
Write-Host "[3/6] 添加所有更改到暂存区..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 添加文件失败" -ForegroundColor Red
    Read-Host "按 Enter 键退出"
    exit 1
}
Write-Host "✓ 文件已添加到暂存区" -ForegroundColor Green
Write-Host ""

# 提交更改
Write-Host "[4/6] 提交更改..." -ForegroundColor Yellow
$commitMsg = Read-Host "请输入提交信息 (直接回车使用默认信息)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Initial commit: 用户认证与权限管理系统"
}
git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "警告: 提交可能失败或没有更改需要提交" -ForegroundColor Yellow
    Write-Host "继续执行推送..." -ForegroundColor Yellow
}
Write-Host "✓ 更改已提交" -ForegroundColor Green
Write-Host ""

# 检查当前分支
Write-Host "[5/6] 检查当前分支..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "当前分支: $currentBranch" -ForegroundColor Cyan
Write-Host ""

# 推送到 GitHub
Write-Host "[6/6] 推送到 GitHub..." -ForegroundColor Yellow
Write-Host "正在推送到远程仓库..." -ForegroundColor Cyan
git push -u origin $currentBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "错误: 推送失败" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因:" -ForegroundColor Yellow
    Write-Host "1. 远程仓库不存在或没有权限"
    Write-Host "2. 需要先拉取远程更改: git pull origin $currentBranch --allow-unrelated-histories"
    Write-Host "3. 网络连接问题"
    Write-Host ""
    $pullFirst = Read-Host "如果这是第一次推送，是否先拉取远程更改? (y/n)"
    if ($pullFirst -eq "y" -or $pullFirst -eq "Y") {
        Write-Host "正在拉取远程更改..." -ForegroundColor Cyan
        git pull origin $currentBranch --allow-unrelated-histories --no-edit
        if ($LASTEXITCODE -eq 0) {
            Write-Host "正在重新推送..." -ForegroundColor Cyan
            git push -u origin $currentBranch
        }
    }
}
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ 上传成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "项目已成功上传到: https://github.com/chenjunhan2333-svg/first" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ 上传失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "请检查错误信息并重试" -ForegroundColor Yellow
    Write-Host ""
}

Read-Host "按 Enter 键退出"

