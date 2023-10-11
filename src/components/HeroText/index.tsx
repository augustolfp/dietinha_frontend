export default function HeroText() {
    return (
        <div className="text-left">
            <h1 className="flex flex-wrap gap-x-3 text-4xl font-black text-base-content mb-6 lg:text-5xl">
                <span className="contrast-150 brightness-150">Conte suas</span>
                <span>
                    <div className="relative">
                        <span className="bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent blur-3xl opacity-70 absolute">
                            Calorias,
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
                            Calorias,
                        </span>
                    </div>
                </span>
                <span className="contrast-150 brightness-150">
                    Sem Complicações
                </span>
            </h1>
            <p className="text-base md:text-lg text-base-content contrast-150 brightness-150">
                O aplicativo Dietinha oferece uma interface simples, sem
                anúncios, e uma lista de alimentos pré-definidos bem recheada. E
                o melhor: 100% grátis!
            </p>
        </div>
    );
}
