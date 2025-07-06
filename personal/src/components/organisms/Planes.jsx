import React, { useState } from 'react';
import Header from './Header'; // Asegúrate de que la ruta sea correcta

const Planes = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(3); // Para resaltar "Planes" en el header

  const plans = [
    {
      name: 'Básico',
      price: isAnnual ? '$1,980/año' : '$199/mes',
      monthlyEquivalent: isAnnual ? '(≈$165/mes)' : '',
      features: [
        '1 página web básica',
        'Diseño responsive',
        'Hosting básico incluido',
        'Formulario de contacto',
        'Soporte por email',
        'Actualizaciones trimestrales'
      ],
      gradient: 'from-slate-900 via-gray-900 to-slate-800',
      borderGlow: 'border-slate-600 hover:border-slate-500',
      accent: 'text-slate-400',
      button: 'bg-slate-700 hover:bg-slate-600 text-white',
      popular: false,
      icon: '🚀'
    },
    {
      name: 'Plus',
      price: isAnnual ? '$3,980/año' : '$399/mes',
      monthlyEquivalent: isAnnual ? '(≈$332/mes)' : '',
      features: [
        'Hasta 3 páginas web',
        'Diseño personalizado',
        'Hosting premium',
        'Formularios avanzados',
        'Soporte prioritario 24/5',
        'Blog integrado',
        'Actualizaciones mensuales',
        'SEO básico incluido'
      ],
      gradient: 'from-purple-900 via-indigo-900 to-purple-800',
      borderGlow: 'border-purple-500 hover:border-purple-400',
      accent: 'text-purple-400',
      button: 'bg-purple-600 hover:bg-purple-500 text-white',
      popular: true,
      icon: '⭐'
    },
    {
      name: 'Diamante',
      price: isAnnual ? '$9,980/año' : '$999/mes',
      monthlyEquivalent: isAnnual ? '(≈$832/mes)' : '',
      features: [
        'Web completa (hasta 10 páginas)',
        'Diseño premium personalizado',
        'Hosting empresarial',
        'Carrito de compras',
        'Soporte 24/7 VIP',
        'Blog profesional',
        'SEO avanzado',
        'Analítica integrada',
        'Actualizaciones semanales',
        'Certificado SSL premium',
        'Copias de seguridad diarias'
      ],
      gradient: 'from-amber-900 via-orange-900 to-amber-800',
      borderGlow: 'border-amber-500 hover:border-amber-400',
      accent: 'text-amber-400',
      button: 'bg-amber-600 hover:bg-amber-500 text-white',
      popular: false,
      icon: '💎'
    }
  ];

  const handleSelectPlan = (planName) => setSelectedPlan(planName);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <Header activeIndex={activeNavItem} setActiveIndex={setActiveNavItem} />
      
      {/* Efectos de fondo animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradientes flotantes */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900/30 filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-900/25 filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-900/20 filter blur-3xl animate-pulse delay-2000"></div>
          
          {/* Partículas brillantes */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal con padding para el header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Encabezado Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium text-purple-400 bg-purple-900/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
            CONSTRUYE TU PRESENCIA WEB
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 leading-tight">
            Planes de Desarrollo
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Web Premium
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Soluciones profesionales diseñadas para hacer crecer tu negocio en el mundo digital
          </p>
        </div>

        {/* Selector de facturación */}
        <div className="flex justify-center mb-16">
          <div className="relative flex items-center bg-gray-900/50 rounded-2xl p-2 border border-gray-700 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl"></div>
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!isAnnual ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isAnnual ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Anual 
              <span className="inline-block ml-2 px-2 py-1 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-black">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Tarjetas de planes */}
        <div className="grid gap-8 md:grid-cols-3 mb-24">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer transform hover:scale-105
                ${selectedPlan === plan.name
                  ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-black shadow-2xl shadow-purple-500/25 scale-105'
                  : 'hover:shadow-2xl hover:shadow-purple-500/10'
                }
              `}
              onClick={() => handleSelectPlan(plan.name)}
            >
              {/* Fondo con gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-90`}></div>
              
              {/* Borde brillante */}
              <div className={`absolute inset-0 rounded-3xl border-2 ${plan.borderGlow} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className={`relative z-10 p-8 h-full flex flex-col`}>
                {/* Encabezado del plan */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className={`text-2xl font-black ${plan.accent} mb-2`}>
                    {plan.name}
                  </h3>
                  <div className="text-center">
                    <span className="text-4xl font-black text-white">
                      {plan.price.split('/')[0]}
                    </span>
                    <span className="text-lg text-gray-400">
                      /{plan.price.split('/')[1]}
                    </span>
                  </div>
                  {plan.monthlyEquivalent && (
                    <p className="text-sm text-gray-400 mt-1">
                      {plan.monthlyEquivalent}
                    </p>
                  )}
                </div>

                {/* Características */}
                <div className="flex-grow mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de selección */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    selectedPlan === plan.name 
                      ? 'bg-white text-black shadow-lg' 
                      : `${plan.button} shadow-lg hover:shadow-xl`
                  }`}
                >
                  {selectedPlan === plan.name ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Seleccionado
                    </span>
                  ) : (
                    'Seleccionar Plan'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla comparativa */}
        <div className="mb-24">
          <div className="bg-gray-900/50 rounded-3xl border border-gray-700 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-8 py-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Comparativa Detallada</h3>
              <p className="text-gray-400">Descubre todas las características de cada plan</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Características
                    </th>
                    {plans.map((plan, i) => (
                      <th key={i} className={`px-6 py-4 text-center text-sm font-bold ${plan.accent} uppercase tracking-wider`}>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">{plan.icon}</span>
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[
                    { name: 'Número de páginas', values: ['1', '3', '10+'] },
                    { name: 'Diseño personalizado', values: ['❌', '✅', '✅'] },
                    { name: 'Soporte', values: ['Email', '24/5', '24/7 VIP'] },
                    { name: 'Actualizaciones', values: ['Trimestral', 'Mensual', 'Semanal'] },
                    { name: 'SEO', values: ['❌', 'Básico', 'Avanzado'] },
                    { name: 'Hosting', values: ['Básico', 'Premium', 'Empresarial'] },
                    { name: 'Formularios', values: ['Básico', 'Avanzados', 'Premium'] },
                    { name: 'Copias de seguridad', values: ['Mensuales', 'Mensuales', 'Diarias'] }
                  ].map((feature, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/30'} hover:bg-gray-700/30 transition-colors duration-200`}>
                      <td className="px-6 py-4 font-medium text-gray-300">
                        {feature.name}
                      </td>
                      {feature.values.map((value, j) => (
                        <td key={j} className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            value === '✅' ? 'bg-green-900/50 text-green-400' :
                            value === '❌' ? 'bg-red-900/50 text-red-400' :
                            'bg-gray-800/50 text-gray-300'
                          }`}>
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Resolvemos las dudas más comunes sobre nuestros planes</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "¿Puedo cambiar de plan más tarde?",
                answer: "¡Por supuesto! Puedes actualizar o cambiar tu plan en cualquier momento desde tu panel de control. Los cambios se reflejarán inmediatamente y ajustaremos la facturación según corresponda."
              },
              {
                question: "¿Hay límites de tráfico en mi sitio web?",
                answer: "Nuestros planes Plus y Diamante incluyen tráfico ilimitado. El plan Básico tiene un límite generoso de 50,000 visitas mensuales, más que suficiente para la mayoría de proyectos."
              },
              {
                question: "¿Qué pasa si necesito más páginas?",
                answer: "Puedes añadir páginas adicionales en cualquier momento. Cada página extra cuesta $300/mes o $3,000/año. También puedes actualizar a un plan superior para obtener más páginas incluidas."
              },
              {
                question: "¿Incluyen dominio gratuito?",
                answer: "El plan Diamante incluye un dominio .com gratuito el primer año. Los demás planes pueden adquirir dominios con 30% de descuento. Todos incluyen subdominio gratuito."
              },
              {
                question: "¿Qué garantía ofrecen?",
                answer: "Ofrecemos una garantía de satisfacción de 30 días. Si no estás completamente satisfecho, te devolvemos el 100% de tu dinero sin hacer preguntas."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm overflow-hidden hover:border-gray-600 transition-all duration-300"
              >
                <button 
                  className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-800/30 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-white pr-4">{item.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-pink-900/50 border border-purple-500/30 backdrop-blur-xl p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-4xl font-black text-white mb-6">
                ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Despegar</span>?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Únete a más de 10,000 empresas que ya confían en nosotros para su presencia digital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Comenzar Ahora
                </button>
                <button className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-xl font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                  Ver Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planes;