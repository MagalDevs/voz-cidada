import { Link } from "react-router-dom";
import { Bell, LogOut, User } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#2B87B3] text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="h-8 w-8" />
                        <div className="flex flex-col">
                            <span className="text-sm">Nome_cidadão</span>
                            <button className="text-xs hover:underline">
                                <span className="flex items-center gap-1">
                                    <LogOut className="h-3 w-3" />
                                    Finalizar Sessão
                                </span>
                            </button>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="hover:underline">HOME</Link>
                        <Link to="/about" className="hover:underline">SOBRE NÓS</Link>
                        <Link to="/contact" className="hover:underline">FALE CONOSCO</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                1
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-col md:flex-row">
                <div className="relative w-full h-40 md:h-auto md:w-1/2 bg-[#689689] rounded-b-[50%] md:rounded-none">
                    <img
                        src="./images/predios2.png"
                        alt="Voz Cidadão"
                        className="w-full h-full object-cover object-[center_90%] md:object-center rounded-b-[50%] md:rounded-none"
                    />
                </div>

                {/* Imagem da nuvem no canto inferior direito da tela 
                <img
                    src="./images/Nuvem.png"
                    alt="Imagem Nuvem"
                    className="fixed bottom-0 right-0 w-32 h-32 object-contain m-4"
                />*/}

                <div className="flex items-center justify-center w-full pt-8 md:w-1/2">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[--cor-primaria2] font-montserrat">Sobre o Voz Cidadão</h2>
                        </div>

                        <div className="mt-4 space-y-4 font-lato">
                            <p className="text-sm text-gray-600 text-justify">
                                O Voz Cidadão foi criado para fortalecer a participação da população de Indaiatuba na melhoria da infraestrutura da cidade. A plataforma permite que os cidadãos relatem problemas e façam solicitações, auxiliando as secretarias de Meio Ambiente e Obras a identificar e priorizar manutenções com base na demanda da comunidade.
                            </p>

                            <p className="text-sm text-gray-600 text-justify">
                                Nosso objetivo é aproximar a população da administração pública, tornando a comunicação mais ágil e eficiente. Ao centralizar e repassar as informações às autoridades competentes, facilitamos o processo de manutenção e zelamos por uma cidade mais organizada e bem cuidada.
                            </p>

                            <p className="text-sm text-gray-600 text-justify">
                                É importante destacar que o Voz Cidadão atua como um canal de comunicação entre a sociedade e a prefeitura, mas a responsabilidade pela execução e resolução das demandas registradas cabe exclusivamente ao município de Indaiatuba.
                            </p>

                            <p className="text-sm text-gray-600 text-center">
                                Juntos, podemos construir uma cidade melhor!
                            </p>

                            <div className="mt-6 text-center">
                                <Link to="/" className="font-medium text-[--cor-primaria2] hover:text-[--cor-primaria] hover:underline">
                                    Voltar à página inicial
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
