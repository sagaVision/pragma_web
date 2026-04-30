export type Product = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  description: string
  audience: string
  checkoutUrl: string
  icon: string
  benefits: string[]
  includes: string[]
  seoTitle: string
  seoDescription: string
}

export const products: Product[] = [
  {
    slug: 'ingles-para-carreira',
    title: 'Inglês para Carreira',
    eyebrow: 'Comunicação profissional',
    summary: 'Para profissionais que precisam comunicar autoridade em reuniões, entrevistas e ambientes internacionais.',
    description:
      'Uma jornada prática para transformar conhecimento passivo em presença profissional. O foco é falar com clareza, segurança e intenção nos contextos reais da sua carreira.',
    audience: 'Profissionais que já estudaram inglês e precisam destravar a fala em situações corporativas.',
    checkoutUrl: 'https://pay.hotmart.com/SEU_CHECKOUT_INGLES_CARREIRA',
    icon: 'fas fa-briefcase',
    benefits: ['Reuniões e apresentações em inglês', 'Entrevistas e negociações', 'Presença executiva e posicionamento'],
    includes: ['Diagnóstico de comunicação', 'Roteiros para situações profissionais', 'Prática guiada com feedback'],
    seoTitle: 'Inglês para Carreira | PRAGMA',
    seoDescription: 'Programa da PRAGMA para profissionais que precisam falar inglês com segurança em reuniões, entrevistas e ambientes internacionais.',
  },
  {
    slug: 'pragma-fluency-path',
    title: 'PRAGMA Fluency Path',
    eyebrow: 'Programa completo',
    summary: 'Método estruturado e personalizado para destravar a fala, construir confiança real e desenvolver fluência com propósito.',
    description:
      'O PRAGMA Fluency Path reorganiza a forma como você acessa a língua. Em vez de acumular regras, você aprende a pensar, responder e se posicionar com naturalidade.',
    audience: 'Alunos que querem uma jornada completa para sair do inglês travado e construir fluência funcional.',
    checkoutUrl: 'https://pay.hotmart.com/SEU_CHECKOUT_FLUENCY_PATH',
    icon: 'fas fa-route',
    benefits: ['Aprendizado por chunks linguísticos', 'Fala desde o primeiro dia', 'Mentoria individual e acompanhamento'],
    includes: ['Diagnóstico profundo', 'Plano de fluência personalizado', 'Sessões de ativação da fala'],
    seoTitle: 'PRAGMA Fluency Path | PRAGMA',
    seoDescription: 'Programa completo da PRAGMA para destravar a fala em inglês e desenvolver fluência com confiança.',
  },
  {
    slug: 'espanhol-para-a-vida',
    title: 'Espanhol para a Vida',
    eyebrow: 'Conexão cultural',
    summary: 'Para quem quer viver o espanhol de verdade em viagens, conexões culturais e experiências ao redor do mundo.',
    description:
      'Um percurso comunicativo para usar o espanhol com autonomia, naturalidade e repertório cultural. A proposta é falar para viver experiências, não apenas estudar o idioma.',
    audience: 'Pessoas que querem se comunicar em espanhol com leveza, autonomia e presença em contextos reais.',
    checkoutUrl: 'https://pay.hotmart.com/SEU_CHECKOUT_ESPANHOL_VIDA',
    icon: 'fas fa-globe-americas',
    benefits: ['Conversação natural e fluida', 'Vocabulário de viagem e vida cotidiana', 'Conexão cultural profunda'],
    includes: ['Situações práticas de comunicação', 'Expressões reais do espanhol', 'Preparação para viagens e vivências'],
    seoTitle: 'Espanhol para a Vida | PRAGMA',
    seoDescription: 'Programa da PRAGMA para aprender espanhol com foco em conversação, viagens e conexão cultural.',
  },
]

export function getProductBySlug(slug: string) {
  return products.find(product => product.slug === slug)
}
