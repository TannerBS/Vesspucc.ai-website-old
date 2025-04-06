# setup-project.ps1
# PowerShell script to set up Vespucc.ai project structure

# Create main directories
New-Item -ItemType Directory -Force -Path "src\components"
New-Item -ItemType Directory -Force -Path "src\pages"
New-Item -ItemType Directory -Force -Path "src\styles"
New-Item -ItemType Directory -Force -Path "src\utils"
New-Item -ItemType Directory -Force -Path "src\assets\images"
New-Item -ItemType Directory -Force -Path "src\assets\models"
New-Item -ItemType Directory -Force -Path "src\assets\fonts"
New-Item -ItemType Directory -Force -Path "src\context"
New-Item -ItemType Directory -Force -Path "src\hooks"

# Create component subdirectories
New-Item -ItemType Directory -Force -Path "src\components\agents"
New-Item -ItemType Directory -Force -Path "src\components\explore"
New-Item -ItemType Directory -Force -Path "src\components\home"
New-Item -ItemType Directory -Force -Path "src\components\layout"
New-Item -ItemType Directory -Force -Path "src\components\token"
New-Item -ItemType Directory -Force -Path "src\components\3d"

# Create server directories
New-Item -ItemType Directory -Force -Path "server"
New-Item -ItemType Directory -Force -Path "server\routes"
New-Item -ItemType Directory -Force -Path "server\controllers"
New-Item -ItemType Directory -Force -Path "server\models"
New-Item -ItemType Directory -Force -Path "server\middleware"
New-Item -ItemType Directory -Force -Path "server\config"

Write-Host "Project directory structure has been created!" -ForegroundColor Green