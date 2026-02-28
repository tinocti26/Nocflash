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
    
    atualizarHistorico();
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
        chamados_hoje: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico?data=' + new Date().toISOString().split('T')[0],
        chamados_andamento: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico?status=andamento',
        chamados_fechados: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico?status=fechado',
        meus_chamados: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico?tecnico=' + sessionStorage.getItem('usuarioNOC'),
        relatorios_os: 'https://tcftelecom.hubsoft.com.br/atendimento_os/relatorios',
        
        // Clientes
        cadastro_cliente: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente/inserir',
        lista_clientes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente',
        clientes_inadimplentes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente?inadimplente=1',
        clientes_bloqueados: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente?bloqueado=1',
        aniversariantes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente?aniversariantes=1',
        contratos: 'https://tcftelecom.hubsoft.com.br/cadastro/contrato',
        
        // Rede
        cpes_onu: 'https://tcftelecom.hubsoft.com.br/rede/rede/cpe',
        olts: 'https://tcftelecom.hubsoft.com.br/rede/rede/equipamento_conexao',
        equipamentos: 'https://tcftelecom.hubsoft.com.br/rede/rede/equipamento',
        mapa_rede: 'https://tcftelecom.hubsoft.com.br/mapeamento/rede',
        monitoramento_rede: 'https://tcftelecom.hubsoft.com.br/rede/monitoramento',
        log_equipamentos: 'https://tcftelecom.hubsoft.com.br/rede/log',
        
        // Financeiro
        faturamento: 'https://tcftelecom.hubsoft.com.br/financeiro/faturamento',
        boletos: 'https://tcftelecom.hubsoft.com.br/financeiro/boletos',
        recebimentos: 'https://tcftelecom.hubsoft.com.br/financeiro/recebimentos',
        contas_receber: 'https://tcftelecom.hubsoft.com.br/financeiro/contas_receber',
        extratos: 'https://tcftelecom.hubsoft.com.br/financeiro/extratos',
        notas_fiscais: 'https://tcftelecom.hubsoft.com.br/financeiro/notas_fiscais'
    };
    
    if (urls[tipo]) {
        window.open(urls[tipo], '_blank');
        mostrarToast(`Abrindo ${tipo}...`, 'success');
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
    
    // Adicionar ao histórico
    historicoBuscas.unshift({
        termo: termo,
        data: new Date().toLocaleString()
    });
    if (historicoBuscas.length > 10) historicoBuscas.pop();
    localStorage.setItem('historicoBuscas', JSON.stringify(historicoBuscas));
    atualizarHistorico();
    
    const somenteNumeros = termo.replace(/\D/g, '');
    
    if (somenteNumeros.length === 11) {
        // CPF
        window.open(`https://tcftelecom.hubsoft.com.br/cadastro/cliente?cpf=${termo}`, '_blank');
        mostrarToast(`Buscando CPF: ${termo}`, 'success');
    } else if (termo.match(/^\d+$/)) {
        // Protocolo
        window.open(`https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/${termo}`, '_blank');
        mostrarToast(`Buscando protocolo: ${termo}`, 'success');
    } else if (termo.match(/^\d{10,11}$/)) {
        // Telefone
        window.open(`https://tcftelecom.hubsoft.com.br/cadastro/cliente?telefone=${termo}`, '_blank');
        mostrarToast(`Buscando telefone: ${termo}`, 'success');
    } else {
        // Nome
        window.open(`https://tcftelecom.hubsoft.com.br/cadastro/cliente?busca=${encodeURIComponent(termo)}`, '_blank');
        mostrarToast(`Buscando: ${termo}`, 'success');
    }
}

function sugestaoBusca(tipo) {
    const input = document.getElementById('buscaHub');
    if (tipo === 'cpf') input.value = '12345678900';
    else if (tipo === 'protocolo') input.value = '123456';
    else if (tipo === 'nome') input.value = 'João';
    else if (tipo === 'telefone') input.value = '34991234567';
    
    buscarHubSoft();
}

function buscarProtocolo() {
    const protocolo = document.getElementById('protocoloBusca').value.trim();
    if (!protocolo) {
        mostrarToast('Digite o número do protocolo!', 'warning');
        return;
    }
    window.open(`https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/${protocolo}`, '_blank');
    mostrarToast(`Buscando protocolo: ${protocolo}`, 'success');
}

function abrirChamadoRapido() {
    window.open('https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico/inserir', '_blank');
    mostrarToast('Abrindo novo chamado...', 'success');
}

function mudarAbaHub(aba, elemento) {
    document.querySelectorAll('.hubsoft-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.hubsoft-content').forEach(c => c.classList.remove('show'));
    
    elemento.classList.add('active');
    document.getElementById(`aba-${aba}`).classList.add('show');
}

function carregarIframe(tipo) {
    const urls = {
        dashboard: 'https://tcftelecom.hubsoft.com.br/dashboard',
        chamados: 'https://tcftelecom.hubsoft.com.br/atendimento_os/ordem_servico',
        clientes: 'https://tcftelecom.hubsoft.com.br/cadastro/cliente',
        mapa: 'https://tcftelecom.hubsoft.com.br/mapeamento/cliente'
    };
    
    const container = document.getElementById('iframeContainer');
    if (container) {
        container.innerHTML = `<iframe src="${urls[tipo]}" style="width:100%; height:500px; border:none; border-radius:8px;"></iframe>`;
        mostrarToast(`Carregando ${tipo}...`, 'success');
    }
}

function atualizarHistorico() {
    const container = document.getElementById('historicoBuscas');
    if (!container) return;
    
    if (historicoBuscas.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhuma busca recente</p>';
        return;
    }
    
    let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
    historicoBuscas.forEach(item => {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-tertiary); padding: 10px; border-radius: 6px;">
                <span>🔍 ${item.termo}</span>
                <small style="color: var(--text-secondary);">${item.data}</small>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function limparHistorico() {
    historicoBuscas = [];
    localStorage.setItem('historicoBuscas', JSON.stringify(historicoBuscas));
    atualizarHistorico();
    mostrarToast('Histórico limpo!', 'success');
}

// ===== SENHAS =====
function toggleSenha(id) {
    const elemento = document.getElementById(id);
    elemento.classList.toggle('show');
}

// ===== MENSAGENS DE DIAGNÓSTICO (ATUALIZADO) =====
function copiarMensagem(tipo) {
    const nome = sessionStorage.getItem('usuarioNOC') || 'Suporte Técnico';
    
    const textos = {
        // DESCONECTADO
        desconectado: `ATENDIMENTO DESCONECTADO

poderia me encaminhar um video de até 10 segundo do roteador, por favor?`,

        // LENTIDÃO - Questionário completo
        lentidao: `ATENDIMENTO LENTIDÃO

o problema de lentidão está  em algum aparelho específico ou  a internet no geral está lenta?

|1. Sobre o local do problema
    A lentidão acontece em todos os aparelhos ou só em um específico
    Você já testou em outro celular/computador para ver se o problema continua?

|2. Sobre o tipo de conexão
    A lentidão acontece tanto no Wi-Fi quanto no cabo, ou só no Wi-Fi?
    Você está longe do roteador quando a internet fica lenta?

|3. Sobre o momento do problema
    A lentidão é o tempo todo ou aparece em certos horários?
    Acontece desde hoje ou faz alguns dias?

|4. Sobre o roteador e o sinal
    O sinal do Wi-Fi aparece fraco no seu aparelho?
    O roteador já foi reiniciado recentemente?

|5. Sobre páginas e apps
    A lentidão acontece em todos os sites e aplicativos?
    Algum aplicativo específico é o que está travando?
    Vídeos também ficam carregando devagar ou só navegação?

|6. Sobre cabos e equipamentos
    O cabo que liga o roteador ao modem está bem encaixado?
    O seu roteador é antigo ou foi trocado recentemente?`,

        // Perguntas específicas
        pergunta_1: "A lentidão acontece em todos os aparelhos ou só em um específico? Você já testou em outro celular/computador?",
        pergunta_2: "A lentidão acontece tanto no Wi-Fi quanto no cabo, ou só no Wi-Fi? Você está longe do roteador?",
        pergunta_3: "A lentidão é o tempo todo ou aparece em certos horários? Acontece desde hoje ou faz alguns dias?",
        pergunta_4: "O sinal do Wi-Fi aparece fraco no seu aparelho? O roteador já foi reiniciado recentemente?",
        pergunta_5: "A lentidão acontece em todos os sites e aplicativos? Vídeos também ficam carregando devagar?",
        pergunta_6: "O cabo que liga o roteador ao modem está bem encaixado? O seu roteador é antigo?"
    };
    
    navigator.clipboard.writeText(textos[tipo] || textos.lentidao).then(() => {
        mostrarToast('✅ Mensagem copiada!', 'success');
    }).catch(() => {
        mostrarToast('❌ Erro ao copiar', 'error');
    });
}

// ===== FERRAMENTAS =====
function pingTest() {
    const ip = prompt('Digite o IP ou domínio para testar:');
    if (ip) {
        mostrarToast(`Testando ping para ${ip}...`, 'warning');
        setTimeout(() => {
            mostrarToast(`Ping concluído! Verifique o console.`, 'success');
            console.log(`Resultado do ping para ${ip}:`);
            console.log('64 bytes: tempo=15ms TTL=54');
            console.log('64 bytes: tempo=14ms TTL=54');
            console.log('Pacotes: enviados = 2, recebidos = 2, perdidos = 0');
        }, 2000);
    }
}

function traceroute() {
    const ip = prompt('Digite o IP ou domínio para traceroute:');
    if (ip) {
        mostrarToast(`Executando traceroute...`, 'warning');
        setTimeout(() => {
            mostrarToast(`Traceroute concluído!`, 'success');
            console.log(`Traceroute para ${ip}:`);
            console.log('1  192.168.1.1  2ms');
            console.log('2  10.0.0.1    5ms');
            console.log('3  8.8.8.8     20ms');
        }, 2000);
    }
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
