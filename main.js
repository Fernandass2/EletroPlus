console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')
const path = require('node:path')

// Janela principal
let win
const createWindow = () => {
    nativeTheme.themeSource = 'light' // Define o tema claro ou escuro
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')

    // Eventos IPC para abrir janelas a partir do renderizador
    ipcMain.on('client-window', () => {
        clientWindow()
    })
    ipcMain.on('os-window', () => {
        osWindow()
    })
    ipcMain.on('suporte-window', () => {
        suporteWindow()
    })
    ipcMain.on('relatorios-window', () => {
        relatoriosWindow()
    })
    ipcMain.on('ajuda-window', () => {
        ajudaWindow()
    })
    ipcMain.on('configuracoes-window', () => {
        configuracoesWindow()
    })
}

// Janela Sobre
function aboutWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        about = new BrowserWindow({
            width: 360,
            height: 220,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true
        })
    }
    about.loadFile('./src/views/sobre.html')
}

// Janela Clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        client = new BrowserWindow({
            width: 1010,
            height: 720,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    client.loadFile('./src/views/cliente.html')
    client.center()
}

// Janela OS
let os
function osWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        os = new BrowserWindow({
            width: 1010,
            height: 720,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    os.loadFile('./src/views/os.html')
    os.center()
}

// Janela Suporte
let suporte
function suporteWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        suporte = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    suporte.loadFile('./src/views/suporte.html')
    suporte.center()
}
// Janela Clientes
let configuracoes
function configuracoesWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        configuracoes = new BrowserWindow({
            width: 1010,
            height: 720,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    configuracoes.loadFile('./src/views/configuracoes.html')
    configuracoes.center()
}

// Janela Relatórios
let relatorios
function relatoriosWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        relatorios = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    relatorios.loadFile('./src/views/relatorios.html')
    relatorios.center()
}

// Janela Ajuda
let ajuda
function ajudaWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        ajuda = new BrowserWindow({
            width: 600,
            height: 400,
            autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    ajuda.loadFile('./src/views/ajuda.html')
    ajuda.center()
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')

// Template do menu
const template = [
    {
        label: 'Cadastro',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientWindow()
            },
            {
                label: 'OS',
                click: () => osWindow()
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Relatórios',
        submenu: [
            {
                label: 'Relatórios',
                click: () => relatoriosWindow()
            }
        ]
    },
    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Ajuda',
                click: () => ajudaWindow()
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    },
    {
        label: 'Suporte',
        submenu: [
            {
                label: 'Suporte',
                click: () => suporteWindow()
            }
        ]
    }
]
