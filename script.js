// ===== VARIÁVEIS GLOBAIS =====
let historicoBuscas = JSON.parse(localStorage.getItem('historicoBuscas') || '[]');

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
    const painel = window.location.hash.replace("#", "");
    if (painel && document.getElementById(painel)) {
        abrirPainel(painel);
    } else {
        abrirPainel("hub");
        window.location.hash = "hub";
    }
    
    if (sessionStorage.getItem('usuarioNOC')) {
        document.getElementById('login-overlay').style.display = 'none';
        document.querySelector('#userInfo span').textContent = sessionStorage.getItem('usuarioNOC');
    }
});

// ===== AUTENTICAÇÃO =====
function entrar() {
    const nome = document.getElementById('nomeUsuario').value.trim();
    if (!nome) {
        mostrarToast('Por favor, digite seu nome!', 'error');
        return;
    }
    sessionStorage.setItem('usuarioNOC', nome);
    document.getElementById('login-overlay').style.display = 'none';
    document.querySelector('#userInfo span').textContent = nome;
    mostrarToast(`Bem-vindo, ${nome}!`, 'success');
}

function logout() {
    sessionStorage.removeItem('usuarioNOC');
    location.reload();
}

// ===== NAVEGAÇÃO =====
function abrir(url) {
    window.open(url, '_blank');
}

function abrirPainel(id) {
    document.querySelectorAll('.painel').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    
    const painelAtivo = document.getElementById(id);
    if (painelAtivo) {
        painelAtivo.classList.add('show');
        window.location.hash = id;
        
        document.querySelectorAll('.menu-item').forEach(item => {
            const texto = item.textContent;
            if ((id === 'hub' && texto.includes('HubSoft')) ||
                (id === 'doc' && texto.includes('Documentação')) ||
                (id === 'senhas' && texto.includes('Credenciais')) ||
                (id === 'monitor' && texto.includes('Monitoramento')) ||
                (id === 'mensagens' && texto.includes('Mensagens')) ||
                (id === 'cursos' && texto.includes('Treinamentos')) ||
                (id === 'tv' && texto.includes('TV')) ||
                (id === 'ferramentas' && texto.includes('Ferramentas'))) {
                item.classList.add('active');
            }
        });
    }
}

// ===== FUNÇÕES HUB SOFT =====
function abrirHubSoft(tipo) {
    const urls = {
        // Principais
        dashboard: 'https://tcftelecom.hubsoft.com.br/dashboard',
        agenda: 'https://tcftelecom.hubsoft.com.br/atendimento_os/agenda_tecnico',
        novo_chamado: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/inserir',
        chamados_abertos: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        mapa_os: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/mapa',
        mapa_cliente: 'https://tcftelecom.hubsoft.com.br/mapeamento/cliente',
        
        // Chamados
        chamados_hoje: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        chamados_andamento: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        chamados_fechados: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        meus_chamados: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        
        // Clientes
        cadastro_cliente: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente/inserir',
        lista_clientes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente',
        clientes_inadimplentes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente',
        clientes_bloqueados: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente',
        
        // Rede
        cpes_onu: 'https://tcftelecom.hubsoft.com.br/rede/rede/cpe',
        olts: 'https://tcftelecom.hubsoft.com.br/rede/rede/equipamento_conexao',
        equipamentos: 'https://tcftelecom.hubsoft.com.br/rede/rede/equipamento',
        mapa_rede: 'https://tcftelecom.hubsoft.com.br/mapeamento/rede',
        
        // Financeiro
        faturamento: 'https://tcftelecom.hubsoft.com.br/financeiro/faturamento',
        boletos: 'https://tcftelecom.hubsoft.com.br/financeiro/boletos',
        recebimentos: 'https://tcftelecom.hubsoft.com.br/financeiro/recebimentos'
    };
    
    if (urls[tipo]) {
        window.open(urls[tipo], '_blank');
    } else {
        window.open('https://tcftelecom.hubsoft.com.br', '_blank');
    }
}

function buscarHubSoft() {
    const termo = document.getElementById('buscaHub').value.trim();
    if (!termo) {
        mostrarToast('Digite algo para buscar!', 'warning');
        return;
    }
    
    const somenteNumeros = termo.replace(/\D/g, '');
    
    if (somenteNumeros.length === 11) {
        // CPF - vai direto para lista de clientes
        window.open('https://tcftelecom.hubsoft.com.br/cadastro/cliente', '_blank');
    } else if (termo.match(/^\d+$/)) {
        // Protocolo - vai para chamados
        window.open('https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico', '_blank');
    } else {
        // Nome/Telefone - busca clientes
        window.open('https://tcftelecom.hubsoft.com.br/cadastro/cliente', '_blank');
    }
    
    mostrarToast(`Abrindo HubSoft para buscar: ${termo}`, 'success');
}

function sugestaoBusca(tipo) {
    const input = document.getElementById('buscaHub');
    if (tipo === 'cpf') input.value = '000.000.000-00';
    else if (tipo === 'protocolo') input.value = '123456';
    else if (tipo === 'nome') input.value = 'João Silva';
    else if (tipo === 'telefone') input.value = '(34) 99999-9999';
    
    buscarHubSoft();
}

function abrirChamadoRapido() {
    window.open('https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/inserir', '_blank');
}

function mudarAbaHub(aba, elemento) {
    document.querySelectorAll('.hubsoft-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.hubsoft-content').forEach(c => c.classList.remove('show'));
    
    elemento.classList.add('active');
    document.getElementById(`aba-${aba}`).classList.add('show');
}

// ===== SENHAS =====
function toggleSenha(id) {
    const elemento = document.getElementById(id);
    elemento.classList.toggle('show');
}

// ===== MENSAGENS =====
function copiarMensagem(periodo) {
    const nome = sessionStorage.getItem('usuarioNOC') || 'Suporte';
    
    const textos = {
        dia: `🌅 Bom dia! Sou ${nome} do suporte técnico. Como posso ajudar?`,
        tarde: `☀️ Boa tarde! Sou ${nome} do suporte técnico.`,
        noite: `🌙 Boa noite! Sou ${nome} do suporte técnico.`,
        rompimento: '⚠️ Identificamos um rompimento na rede. Equipe já está atendendo.',
        diaA: `🌅 Bom dia! Sou ${nome} do agendamento.`,
        tardeA: `☀️ Boa tarde! Sou ${nome} do agendamento.`,
        noiteA: `🌙 Boa noite! Sou ${nome} do agendamento.`
    };
    
    navigator.clipboard.writeText(textos[periodo] || textos.dia).then(() => {
        mostrarToast('✅ Mensagem copiada!', 'success');
    });
}

// ===== FERRAMENTAS =====
function calculadoraIP() {
    window.open('https://www.calculator.net/ip-subnet-calculator.html', '_blank');
}

// ===== TOAST =====
function mostrarToast(mensagem, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <i>${tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : '⚠️'}</i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
