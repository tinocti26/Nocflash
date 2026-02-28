<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NOC TCF Telecom - Centro de Operações</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- WHATSAPP FLOAT -->
    <a href="https://wa.me/5534991982529?text=Desejo falar com o suporte NOC." 
       target="_blank" 
       class="whatsapp-float">
        <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    </a>

    <!-- LOGIN MODERNO -->
    <div id="login-overlay">
        <div class="login-box">
            <h2><i>🔐</i> NOC TCF TELECOM</h2>
            <input id="nomeUsuario" type="text" placeholder="Digite seu nome completo" autofocus>
            <button onclick="entrar()">ACESSAR SISTEMA</button>
        </div>
    </div>

    <!-- LAYOUT PRINCIPAL -->
    <div class="layout">
        <!-- MENU LATERAL -->
        <div class="menu">
            <div class="menu-header">
                <h2>
                    <i>📡</i>
                    NOC TCF
                </h2>
                <div class="user-info" id="userInfo">
                    <i>👤</i>
                    <span>Carregando...</span>
                </div>
            </div>
            
            <div class="menu-item active" onclick="abrirPainel('hub')">
                <i>📊</i> HubSoft
            </div>
            <div class="menu-item" onclick="abrirPainel('doc')">
                <i>📃</i> Documentação
            </div>
            <div class="menu-item" onclick="abrirPainel('senhas')">
                <i>🔑</i> Credenciais
            </div>
            <div class="menu-item" onclick="abrirPainel('monitor')">
                <i>📡</i> Monitoramento
            </div>
            <div class="menu-item" onclick="abrirPainel('mensagens')">
                <i>💬</i> Mensagens
            </div>
            <div class="menu-item" onclick="abrirPainel('cursos')">
                <i>📚</i> Treinamentos
            </div>
            <div class="menu-item" onclick="abrirPainel('tv')">
                <i>📺</i> TV Corporativa
            </div>
            <div class="menu-item" onclick="abrirPainel('ferramentas')">
                <i>🛠️</i> Ferramentas
            </div>
            <div class="menu-item" onclick="logout()">
                <i>🚪</i> Sair
            </div>
        </div>

        <!-- CONTEÚDO PRINCIPAL -->
        <div class="conteudo">
            <!-- PAINEL HUB -->
            <div class="painel show" id="hub">
                <h1 class="titulo-painel"><i>📊</i> HubSoft Integrado</h1>
                
                <!-- BUSCA RÁPIDA -->
                <div class="hubsoft-container">
                    <h2 class="hubsoft-title">🔍 Busca Inteligente</h2>
                    <div class="busca-rapida">
                        <input type="text" id="buscaHub" placeholder="Digite nome, CPF, protocolo, endereço ou telefone..." onkeypress="if(event.key === 'Enter') buscarHubSoft()">
                        <button onclick="buscarHubSoft()" class="btn-ferramenta btn-buscar">
                            <i>🔎</i> Buscar
                        </button>
                    </div>
                    
                    <!-- SUGESTÕES RÁPIDAS -->
                    <div class="sugestoes">
                        <span class="badge sugestao-item" onclick="sugestaoBusca('cpf')">📄 CPF</span>
                        <span class="badge sugestao-item" onclick="sugestaoBusca('protocolo')">📋 Protocolo</span>
                        <span class="badge sugestao-item" onclick="sugestaoBusca('nome')">👤 Nome</span>
                        <span class="badge sugestao-item" onclick="sugestaoBusca('telefone')">📱 Telefone</span>
                    </div>
                </div>

                <!-- TABS HUB -->
                <div class="hubsoft-container">
                    <div class="hubsoft-tabs">
                        <div class="hubsoft-tab active" onclick="mudarAbaHub('principais', this)">📍 Principais</div>
                        <div class="hubsoft-tab" onclick="mudarAbaHub('chamados', this)">📋 Chamados</div>
                        <div class="hubsoft-tab" onclick="mudarAbaHub('clientes', this)">👥 Clientes</div>
                        <div class="hubsoft-tab" onclick="mudarAbaHub('rede', this)">🌐 Rede</div>
                        <div class="hubsoft-tab" onclick="mudarAbaHub('financeiro', this)">💰 Financeiro</div>
                    </div>

                    <!-- ABA PRINCIPAIS -->
                    <div class="hubsoft-content show" id="aba-principais">
                        <div class="grid-3">
                            <button class="btn-ferramenta" onclick="abrirHubSoft('dashboard')">
                                <i>📈</i> Dashboard
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('agenda')">
                                <i>📅</i> Agenda Técnicos
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('novo_chamado')">
                                <i>➕</i> Novo Chamado
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('chamados_abertos')">
                                <i>📋</i> Chamados Abertos
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('mapa_os')">
                                <i>🗺️</i> Mapa de OS
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('mapa_cliente')">
                                <i>📍</i> Mapa Clientes
                            </button>
                        </div>
                    </div>

                    <!-- ABA CHAMADOS -->
                    <div class="hubsoft-content" id="aba-chamados">
                        <div class="grid-3">
                            <button class="btn-ferramenta" onclick="abrirHubSoft('chamados_hoje')">
                                <i>📆</i> Chamados Hoje
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('chamados_andamento')">
                                <i>🔄</i> Em Andamento
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('chamados_fechados')">
                                <i>✅</i> Fechados Hoje
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('meus_chamados')">
                                <i>👤</i> Meus Chamados
                            </button>
                            <button class="btn-ferramenta" onclick="abrirChamadoRapido()">
                                <i>⚡</i> Chamado Rápido
                            </button>
                        </div>
                    </div>

                    <!-- ABA CLIENTES -->
                    <div class="hubsoft-content" id="aba-clientes">
                        <div class="grid-3">
                            <button class="btn-ferramenta" onclick="abrirHubSoft('cadastro_cliente')">
                                <i>➕</i> Novo Cliente
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('lista_clientes')">
                                <i>📋</i> Lista Clientes
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('clientes_inadimplentes')">
                                <i>⚠️</i> Inadimplentes
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('clientes_bloqueados')">
                                <i>🔒</i> Bloqueados
                            </button>
                        </div>
                    </div>

                    <!-- ABA REDE -->
                    <div class="hubsoft-content" id="aba-rede">
                        <div class="grid-3">
                            <button class="btn-ferramenta" onclick="abrirHubSoft('cpes_onu')">
                                <i>🖧</i> CPEs/ONUs
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('olts')">
                                <i>🔌</i> OLTs
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('equipamentos')">
                                <i>📡</i> Equipamentos
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('mapa_rede')">
                                <i>🗺️</i> Mapa da Rede
                            </button>
                        </div>
                    </div>

                    <!-- ABA FINANCEIRO -->
                    <div class="hubsoft-content" id="aba-financeiro">
                        <div class="grid-3">
                            <button class="btn-ferramenta" onclick="abrirHubSoft('faturamento')">
                                <i>💰</i> Faturamento
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('boletos')">
                                <i>📄</i> Boletos
                            </button>
                            <button class="btn-ferramenta" onclick="abrirHubSoft('recebimentos')">
                                <i>💵</i> Recebimentos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PAINEL DOCUMENTAÇÃO -->
            <div class="painel" id="doc">
                <h1 class="titulo-painel"><i>📃</i> Documentação TCF</h1>
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <i>📚</i>
                            <h2>Documentação Técnica</h2>
                        </div>
                        <button class="btn-ferramenta" onclick="abrir('https://treinamentos-tcf.pages.dev')">
                            <i>📖</i> Base de Conhecimento
                        </button>
                    </div>
                </div>    
            </div>

            <!-- PAINEL SENHAS -->
            <div class="painel" id="senhas">
                <h1 class="titulo-painel"><i>🔑</i> Credenciais dos Equipamentos</h1>
                
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <i>🔷</i>
                            <h2>HUAWEI</h2>
                        </div>
                        <div class="card senha-btn" onclick="toggleSenha('huawei')">
                            <span>Ver Credenciais</span>
                        </div>
                        <div class="credencial" id="huawei">
                            <strong>👤 Usuário:</strong> Epadmin / telecomadmin<br>
                            <strong>🔑 Senha:</strong> 2amt0j1t8 / Tcf@Hw2@23!
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <i>🔶</i>
                            <h2>TP-LINK</h2>
                        </div>
                        <div class="card senha-btn" onclick="toggleSenha('tplink')">
                            <span>Ver Credenciais</span>
                        </div>
                        <div class="credencial" id="tplink">
                            <strong>🔑 Senha:</strong> tcfadmin001 / 2amt0j1t8
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <i>🔷</i>
                            <h2>DATACOM</h2>
                        </div>
                        <div class="card senha-btn" onclick="toggleSenha('datacom')">
                            <span>Ver Credenciais</span>
                        </div>
                        <div class="credencial" id="datacom">
                            <strong>👤 Usuário:</strong> admin / user<br>
                            <strong>🔑 Senha:</strong> 2amt0j1t8 / #TcFcnM@2019*98
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <i>🔶</i>
                            <h2>V-SOL</h2>
                        </div>
                        <div class="card senha-btn" onclick="toggleSenha('sol')">
                            <span>Ver Credenciais</span>
                        </div>
                        <div class="credencial" id="sol">
                            <strong>👤 Usuário:</strong> admin<br>
                            <strong>🔑 Senha:</strong> 2amt0j1t8 / stdONU101
                        </div>
                    </div>
                </div>
            </div>

            <!-- PAINEL MONITORAMENTO -->
            <div class="painel" id="monitor">
                <h1 class="titulo-painel"><i>📡</i> Monitoramento de Rede</h1>
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <i>🟢</i>
                            <h2>GPON</h2>
                        </div>
                        <button class="btn-ferramenta" onclick="abrir('https://grafana.tcftelecom.com.br')">
                            <i>📊</i> Acessar Grafana
                        </button>
                    </div>
                </div>
            </div>

            <!-- PAINEL MENSAGENS -->
            <div class="painel" id="mensagens">
                <h1 class="titulo-painel"><i>💬</i> Mensagens Automáticas</h1>
                
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <i>🗓️</i>
                            <h2>Agendamento</h2>
                        </div>
                        <button class="btn-ferramenta" onclick="copiarMensagem('diaA')">
                            <i>🌅</i> Bom dia
                        </button>
                        <button class="btn-ferramenta" onclick="copiarMensagem('tardeA')">
                            <i>☀️</i> Boa tarde
                        </button>   
                        <button class="btn-ferramenta" onclick="copiarMensagem('noiteA')">
                            <i>🌙</i> Boa noite
                        </button>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <i>🛠️</i>
                            <h2>Suporte Técnico</h2>
                        </div>
                        <button class="btn-ferramenta" onclick="copiarMensagem('dia')">
                            <i>🌅</i> Bom dia
                        </button>
                        <button class="btn-ferramenta" onclick="copiarMensagem('tarde')">
                            <i>☀️</i> Boa tarde
                        </button> 
                        <button class="btn-ferramenta" onclick="copiarMensagem('noite')">
                            <i>🌙</i> Boa noite
                        </button>
                        <button class="btn-ferramenta" onclick="copiarMensagem('rompimento')">
                            <i>⚠️</i> Rompimento
                        </button>
                    </div>
                </div>
            </div>

            <!-- PAINEL CURSOS -->
            <div class="painel" id="cursos">
                <h1 class="titulo-painel"><i>📚</i> Treinamentos</h1>
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <i>🎓</i>
                            <h2>YouTube</h2>
                        </div>
                        <button class="btn-ferramenta" onclick="abrir('https://youtube.com')">
                            <i>📘</i> Cursos
                        </button>
                    </div>
                </div>
            </div>

            <!-- PAINEL TV -->
            <div class="painel" id="tv">
                <h1 class="titulo-painel"><i>📺</i> TV Corporativa</h1>  
                <div class="grid-container">
                    <div class="card">
                        <button class="btn-ferramenta" onclick="abrir('http://tv.tcftelecom.com.br')">
                            <i>🌐</i> Acessar TV Web
                        </button>
                    </div>
                </div>
            </div>

            <!-- PAINEL FERRAMENTAS -->
            <div class="painel" id="ferramentas">
                <h1 class="titulo-painel"><i>🛠️</i> Ferramentas</h1>
                <div class="grid-container">
                    <div class="card">
                        <button class="btn-ferramenta" onclick="calculadoraIP()">
                            <i>🧮</i> Calculadora IP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
