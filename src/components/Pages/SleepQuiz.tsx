import React, { useState } from 'react';
import { ArrowLeft, Brain, CheckCircle, RotateCcw, Award, TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface SleepQuizProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
    score: number;
  }[];
}

interface DiagnosisResult {
  title: string;
  description: string;
  tips: string[];
  color: string;
  icon: string;
}

const SleepQuiz: React.FC<SleepQuizProps> = ({ onBack }) => {
  const { isDark } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "A que horas você costuma ir dormir nos dias de semana?",
      options: [
        { letter: "A", text: "Antes das 22h", score: 5 },
        { letter: "B", text: "Entre 22h e 23h", score: 4 },
        { letter: "C", text: "Entre 23h e 00h", score: 3 },
        { letter: "D", text: "Após 00h", score: 2 },
        { letter: "E", text: "Nunca tenho horário fixo", score: 1 }
      ]
    },
    {
      id: 2,
      question: "A que horas você costuma ir dormir nos finais de semana?",
      options: [
        { letter: "A", text: "Antes das 22h", score: 5 },
        { letter: "B", text: "Entre 22h e 23h", score: 4 },
        { letter: "C", text: "Entre 23h e 00h", score: 3 },
        { letter: "D", text: "Após 00h", score: 2 },
        { letter: "E", text: "Nunca tenho horário fixo", score: 1 }
      ]
    },
    {
      id: 3,
      question: "Com que frequência você pratica atividade física?",
      options: [
        { letter: "A", text: "Todos os dias", score: 5 },
        { letter: "B", text: "De 3 a 5 vezes por semana", score: 4 },
        { letter: "C", text: "Uma vez por semana", score: 3 },
        { letter: "D", text: "Raramente", score: 2 },
        { letter: "E", text: "Nunca", score: 1 }
      ]
    },
    {
      id: 4,
      question: "Qual é o seu nível de estresse no dia a dia?",
      options: [
        { letter: "A", text: "Muito baixo, me sinto tranquilo", score: 5 },
        { letter: "B", text: "Moderado, consigo gerenciar bem", score: 4 },
        { letter: "C", text: "Alto, às vezes me sinto sobrecarregado", score: 3 },
        { letter: "D", text: "Muito alto, fico constantemente ansioso", score: 2 },
        { letter: "E", text: "Não sei, nunca parei para avaliar", score: 1 }
      ]
    },
    {
      id: 5,
      question: "Você consome cafeína (café, chá, refrigerante) após as 17h?",
      options: [
        { letter: "A", text: "Nunca", score: 5 },
        { letter: "B", text: "Raramente", score: 4 },
        { letter: "C", text: "Às vezes", score: 3 },
        { letter: "D", text: "Frequentemente", score: 2 },
        { letter: "E", text: "Sempre", score: 1 }
      ]
    },
    {
      id: 6,
      question: "Você costuma usar dispositivos (celular, computador, TV) antes de dormir?",
      options: [
        { letter: "A", text: "Não, evito totalmente", score: 5 },
        { letter: "B", text: "Raramente, apenas para relaxar", score: 4 },
        { letter: "C", text: "Às vezes, mas por pouco tempo", score: 3 },
        { letter: "D", text: "Frequentemente, por mais de uma hora", score: 2 },
        { letter: "E", text: "Sempre, fico até muito tarde", score: 1 }
      ]
    },
    {
      id: 7,
      question: "Você tem algum problema para adormecer à noite?",
      options: [
        { letter: "A", text: "Nunca", score: 5 },
        { letter: "B", text: "Raramente", score: 4 },
        { letter: "C", text: "Às vezes, me custa um pouco", score: 3 },
        { letter: "D", text: "Frequentemente, tenho dificuldade", score: 2 },
        { letter: "E", text: "Sempre, demoro muito para pegar no sono", score: 1 }
      ]
    },
    {
      id: 8,
      question: "Você acorda durante a noite?",
      options: [
        { letter: "A", text: "Nunca, durmo a noite toda", score: 5 },
        { letter: "B", text: "Raramente, acordo por alguns minutos", score: 4 },
        { letter: "C", text: "Às vezes, mas consigo voltar a dormir rapidamente", score: 3 },
        { letter: "D", text: "Frequentemente, acordo várias vezes", score: 2 },
        { letter: "E", text: "Sempre, acordo várias vezes e não consigo voltar a dormir", score: 1 }
      ]
    },
    {
      id: 9,
      question: "Você tem algum problema de saúde que pode afetar seu sono (ex: apneia, insônia)?",
      options: [
        { letter: "A", text: "Não tenho problemas de saúde", score: 5 },
        { letter: "B", text: "Tenho problemas leves, mas são controláveis", score: 4 },
        { letter: "C", text: "Tenho alguns sintomas ocasionais, mas não fiz exame", score: 3 },
        { letter: "D", text: "Tenho problemas frequentes e estou tratando", score: 2 },
        { letter: "E", text: "Tenho um diagnóstico confirmado e estou em tratamento", score: 1 }
      ]
    },
    {
      id: 10,
      question: "Qual é a sua rotina alimentar antes de dormir?",
      options: [
        { letter: "A", text: "Não como nada antes de dormir", score: 5 },
        { letter: "B", text: "Como uma refeição leve e saudável", score: 4 },
        { letter: "C", text: "Como um lanche mais substancial", score: 3 },
        { letter: "D", text: "Como alimentos pesados ou gordurosos", score: 2 },
        { letter: "E", text: "Sempre como alimentos açucarados ou processados", score: 1 }
      ]
    },
    {
      id: 11,
      question: "Você bebe álcool durante a noite?",
      options: [
        { letter: "A", text: "Nunca", score: 5 },
        { letter: "B", text: "Raramente", score: 4 },
        { letter: "C", text: "Às vezes, com moderação", score: 3 },
        { letter: "D", text: "Frequentemente, mas de forma controlada", score: 2 },
        { letter: "E", text: "Sempre, regularmente", score: 1 }
      ]
    },
    {
      id: 12,
      question: "Você fuma ou usa algum produto de nicotina?",
      options: [
        { letter: "A", text: "Nunca fumei", score: 5 },
        { letter: "B", text: "Fumei no passado, mas parei", score: 4 },
        { letter: "C", text: "Fumo raramente", score: 3 },
        { letter: "D", text: "Fumo com frequência", score: 2 },
        { letter: "E", text: "Fumo todos os dias", score: 1 }
      ]
    },
    {
      id: 13,
      question: "Você tem uma rotina relaxante antes de dormir (meditação, leitura, banho quente)?",
      options: [
        { letter: "A", text: "Sim, sempre faço algo relaxante", score: 5 },
        { letter: "B", text: "Raramente, mas tento relaxar", score: 4 },
        { letter: "C", text: "Às vezes, mas costumo fazer isso em outros momentos", score: 3 },
        { letter: "D", text: "Não, raramente me preparo para dormir", score: 2 },
        { letter: "E", text: "Nunca, vou direto para a cama", score: 1 }
      ]
    },
    {
      id: 14,
      question: "O seu ambiente de sono é confortável?",
      options: [
        { letter: "A", text: "Sim, tenho um ambiente totalmente confortável e silencioso", score: 5 },
        { letter: "B", text: "É razoavelmente confortável, mas poderia melhorar", score: 4 },
        { letter: "C", text: "Às vezes, tenho dificuldades com o ambiente", score: 3 },
        { letter: "D", text: "Não, o ambiente não é muito confortável", score: 2 },
        { letter: "E", text: "Não, tenho problemas com o colchão, ruídos ou luz", score: 1 }
      ]
    },
    {
      id: 15,
      question: "Você acorda sentindo-se descansado e pronto para o dia?",
      options: [
        { letter: "A", text: "Sempre, acordo renovado", score: 5 },
        { letter: "B", text: "Na maioria das vezes, mas me sinto cansado por alguns momentos", score: 4 },
        { letter: "C", text: "Às vezes, mas sinto que preciso de mais descanso", score: 3 },
        { letter: "D", text: "Raramente, acordo muito cansado", score: 2 },
        { letter: "E", text: "Nunca, sempre sinto que não dormi o suficiente", score: 1 }
      ]
    },
    {
      id: 16,
      question: "Você tem o hábito de dormir com o seu quarto completamente escuro?",
      options: [
        { letter: "A", text: "Sim, sempre durmo no escuro", score: 5 },
        { letter: "B", text: "Às vezes, mas uso luz suave", score: 4 },
        { letter: "C", text: "Uso uma luz fraca, como uma luz noturna", score: 3 },
        { letter: "D", text: "Nunca, sempre deixo alguma luz acesa", score: 2 },
        { letter: "E", text: "Depende do dia, não tenho um padrão", score: 1 }
      ]
    },
    {
      id: 17,
      question: "Você se sente cansado ou com sono ao longo do dia?",
      options: [
        { letter: "A", text: "Nunca", score: 5 },
        { letter: "B", text: "Raramente", score: 4 },
        { letter: "C", text: "Às vezes", score: 3 },
        { letter: "D", text: "Frequentemente", score: 2 },
        { letter: "E", text: "Sempre", score: 1 }
      ]
    },
    {
      id: 18,
      question: "Você tem dificuldade em manter o horário de sono nos fins de semana?",
      options: [
        { letter: "A", text: "Não, meu horário de sono é o mesmo todos os dias", score: 5 },
        { letter: "B", text: "Às vezes, mas não muito", score: 4 },
        { letter: "C", text: "Frequentemente, acordo mais tarde nos finais de semana", score: 3 },
        { letter: "D", text: "Sempre, meu horário de sono no fim de semana é completamente irregular", score: 2 },
        { letter: "E", text: "Nunca sigo um horário fixo para dormir", score: 1 }
      ]
    },
    {
      id: 19,
      question: "Você já teve algum problema relacionado a ronco ou apneia do sono?",
      options: [
        { letter: "A", text: "Nunca", score: 5 },
        { letter: "B", text: "De vez em quando, mas não é algo grave", score: 4 },
        { letter: "C", text: "Sim, mas fiz tratamento e melhorei", score: 3 },
        { letter: "D", text: "Sim, tenho problemas sérios com apneia ou ronco", score: 2 },
        { letter: "E", text: "Não sei, nunca fui diagnosticado", score: 1 }
      ]
    },
    {
      id: 20,
      question: "Você se sente energizado durante o dia sem precisar de cochilos?",
      options: [
        { letter: "A", text: "Sempre, me sinto bem descansado", score: 5 },
        { letter: "B", text: "Na maioria das vezes, não preciso de cochilos", score: 4 },
        { letter: "C", text: "Às vezes, fico com sono à tarde, mas não cochilo", score: 3 },
        { letter: "D", text: "Frequentemente, preciso de cochilos durante o dia", score: 2 },
        { letter: "E", text: "Sempre, preciso de cochilos para me sentir bem", score: 1 }
      ]
    }
  ];

  const getDiagnosis = (totalScore: number): DiagnosisResult => {
    if (totalScore >= 90) {
      return {
        title: "Sono Excelente e Bem Regulamentado",
        description: "Parabéns! Você tem uma rotina de sono saudável e está no caminho certo para manter uma excelente qualidade de vida.",
        tips: [
          "Continue com seus bons hábitos e mantenha a regularidade de horário para dormir e acordar",
          "Evite alimentos e bebidas estimulantes, como café e álcool, nas 3 horas antes de dormir",
          "Pratique atividades relaxantes, como meditação ou leitura, e mantenha seu ambiente de sono confortável",
          "Continue com sua prática regular de exercícios físicos",
          "Seu sono está ótimo! Mantenha essa rotina saudável"
        ],
        color: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
        icon: "🌟"
      };
    } else if (totalScore >= 75) {
      return {
        title: "Sono Bom, Mas Pode Melhorar",
        description: "Seu sono é bom, mas há algumas melhorias que podem ser feitas para otimizar ainda mais sua qualidade de descanso.",
        tips: [
          "Tente estabelecer horários de sono mais consistentes, tanto durante a semana quanto nos finais de semana",
          "Evite usar dispositivos antes de dormir e crie uma rotina de relaxamento",
          "Reduza o consumo de cafeína ou álcool à noite",
          "Melhore seu ambiente de sono com temperatura adequada e menos ruído",
          "Considere praticar técnicas de respiração antes de dormir"
        ],
        color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
        icon: "😊"
      };
    } else if (totalScore >= 60) {
      return {
        title: "Sono Interrompido e Pouco Reparador",
        description: "Seu sono está sendo interrompido durante a noite, o que pode estar afetando sua energia e bem-estar durante o dia.",
        tips: [
          "Melhore seu ambiente de sono, ajustando a temperatura e eliminando fontes de luz ou ruído",
          "Evite alimentos pesados antes de dormir",
          "Adote uma rotina relaxante, como meditação ou leitura, para ajudar a acalmar a mente",
          "Considere usar cortinas blackout e protetores de ouvido",
          "Limite o uso de dispositivos eletrônicos 1 hora antes de dormir"
        ],
        color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
        icon: "😐"
      };
    } else if (totalScore >= 45) {
      return {
        title: "Sono Insuficiente e Cansaço Acumulado",
        description: "Seu sono não está sendo suficiente e isso pode estar afetando sua saúde física e mental de forma significativa.",
        tips: [
          "Ajuste seu horário de sono para garantir ao menos 7-8 horas de descanso por noite",
          "Evite o uso de dispositivos eletrônicos antes de dormir",
          "Prefira atividades relaxantes para preparar o corpo para o descanso",
          "Estabeleça uma rotina noturna consistente",
          "Considere procurar ajuda profissional se os problemas persistirem"
        ],
        color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
        icon: "😴"
      };
    } else if (totalScore >= 30) {
      return {
        title: "Frequentes Acordes Noturnos e Dificuldade para Dormir",
        description: "Você está enfrentando dificuldades significativas para manter um sono contínuo e reparador.",
        tips: [
          "Melhore o conforto do seu colchão e o ambiente de sono",
          "Limite a ingestão de cafeína e evite refeições pesadas à noite",
          "Pratique técnicas de relaxamento antes de dormir, como respiração profunda ou yoga",
          "Mantenha horários regulares para dormir e acordar",
          "Considere consultar um especialista em medicina do sono"
        ],
        color: "from-red-500/20 to-red-600/20 border-red-500/30",
        icon: "😰"
      };
    } else {
      return {
        title: "Sono de Má Qualidade e Cansaço Excessivo",
        description: "Seu sono não está sendo reparador e isso está impactando significativamente sua qualidade de vida. É importante buscar ajuda profissional.",
        tips: [
          "Procure orientação médica especializada em medicina do sono",
          "Melhore drasticamente a qualidade do seu ambiente de sono",
          "Evite completamente estimulantes antes de dormir",
          "Estabeleça uma rotina muito mais consistente e estruturada",
          "Considere terapia cognitivo-comportamental para insônia",
          "Reduza o estresse através de atividades relaxantes regulares"
        ],
        color: "from-red-600/20 to-red-700/20 border-red-600/30",
        icon: "😵"
      };
    }
  };

  const handleAnswerSelect = (score: number, index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, questions[currentQuestion].options[selectedAnswer].score];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      // Scroll to top when moving to next question
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
      
      // Scroll to top when moving to previous question
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const diagnosis = getDiagnosis(totalScore);
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-white via-emerald-50/80 to-emerald-100/60'
      }`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/95 border-slate-800' 
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400" />
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Resultado do Diagnóstico</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8 max-w-4xl mx-auto">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">{diagnosis.icon}</span>
            </div>
            <div className={`text-6xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {totalScore}
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              de {questions.length * 5} pontos possíveis
            </div>
          </div>

          {/* Diagnosis Result */}
          <div className={`border rounded-2xl p-6 lg:p-8 mb-8 transition-colors duration-300 ${
            isDark 
              ? `bg-gradient-to-r ${diagnosis.color}` 
              : `bg-gradient-to-r ${diagnosis.color} shadow-sm`
          }`}>
            <h2 className={`text-2xl font-bold mb-4 text-center transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {diagnosis.title}
            </h2>
            <p className={`text-lg leading-relaxed mb-6 text-center transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {diagnosis.description}
            </p>
          </div>

          {/* Tips Section */}
          <div className={`border rounded-2xl p-6 lg:p-8 mb-8 transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-900/50 border-slate-800' 
              : 'bg-white/80 border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Dicas Personalizadas para Melhorar
              </h3>
            </div>
            
            <div className="space-y-4">
              {diagnosis.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors duration-300 ${
                    isDark 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-emerald-500/30 text-emerald-600'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`text-sm lg:text-base leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
              Refazer Quiz
            </button>
            
            <button
              onClick={onBack}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-white via-emerald-50/80 to-emerald-100/60'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'hover:bg-slate-800 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-emerald-400" />
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Diagnóstico do Sono</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className={`px-6 py-4 transition-colors duration-300 ${
        isDark ? 'bg-slate-900/50' : 'bg-emerald-50/50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isDark ? 'text-slate-400' : 'text-emerald-700'
          }`}>
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isDark ? 'text-slate-400' : 'text-emerald-700'
          }`}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className={`rounded-full h-2 transition-colors duration-300 ${
          isDark ? 'bg-slate-800' : 'bg-emerald-200/50'
        }`}>
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Question */}
        <div className={`border rounded-2xl p-6 lg:p-8 mb-8 transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/50 border-slate-800' 
            : 'bg-white/80 border-gray-200 shadow-sm'
        }`}>
          <h2 className={`text-xl lg:text-2xl font-bold mb-6 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {questions[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.score, index)}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                  selectedAnswer === index
                    ? isDark
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                      : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-900'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                      : 'bg-white/70 border-gray-200 text-gray-700 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    selectedAnswer === index
                      ? 'bg-emerald-500 text-white'
                      : isDark
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {option.letter}
                  </div>
                  <span className="flex-1">{option.text}</span>
                  {selectedAnswer === index && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              currentQuestion === 0
                ? isDark
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
                : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Anterior
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              selectedAnswer === null
                ? 'bg-emerald-500/50 text-emerald-300 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepQuiz;