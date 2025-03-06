/**
 * Arquivo de pré-carregamento e reforço de segurança na comunicação
 * entre processos (IPC)
 */

// Importação dos recursos do framework Electron
const { contextBridge, ipcRenderer } = require('electron')

// Expor (autorizar a comunicação entre processos)
contextBridge.exposeInMainWorld('api', {
    // Função para abrir a janela de Clientes
    clientWindow: () => ipcRenderer.send('client-window'),

    // Função para abrir a janela de Ordens de Serviço (OS)
    osWindow: () => ipcRenderer.send('os-window'),

    // Função para abrir a janela de Suporte
    suporteWindow: () => ipcRenderer.send('suporte-window'),

    // Função para abrir a janela de Relatórios
    relatoriosWindow: () => ipcRenderer.send('relatorios-window'),

    // Função para abrir a janela de Ajuda
    ajudaWindow: () => ipcRenderer.send('ajuda-window'),

      // Função para abrir a janela de Configuração
      configuracoesWindow: () => ipcRenderer.send('configuracoes-window')
})
    