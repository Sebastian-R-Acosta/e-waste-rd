import {
  Battery, Smartphone, Monitor, Cpu, Cable, Tv, Printer, TabletIcon, Tv as TvIcon, Gamepad2,
} from "lucide-react"
import type { ComponentType } from "react"

export interface DeviceMaterial {
  name: string
  percent: number
  color: string
}

export interface DeviceProduct {
  name: string
  description: string
  material: string
}

export interface DeviceProcess {
  step: string
  description: string
}

export interface DeviceImpact {
  co2PerKg: number
  recoveryRate: number
  energySavedKwhPerKg: number
}

export interface DeviceType {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  emoji: string
  description: string
  longDescription: string
  materials: DeviceMaterial[]
  products: DeviceProduct[]
  impact: DeviceImpact
  funFact: string
  process: DeviceProcess[]
}

export const deviceTypes: DeviceType[] = [
  {
    id: "baterias",
    label: "Baterías",
    icon: Battery,
    emoji: "🔋",
    description: "Litio, níquel-cadmio y alcalinas",
    longDescription:
      "Las baterías contienen metales valiosos y altamente recuperables. Su reciclaje evita la contaminación de suelos y acuíferos por metales pesados, y permite reutilizar materiales críticos para la fabricación de nuevas baterías y sistemas de almacenamiento de energía.",
    materials: [
      { name: "Litio", percent: 98, color: "#22c55e" },
      { name: "Cobalto", percent: 95, color: "#3b82f6" },
      { name: "Níquel", percent: 90, color: "#8b5cf6" },
      { name: "Grafito", percent: 85, color: "#6b7280" },
    ],
    products: [
      { name: "Baterías Nuevas", description: "Baterías recicladas para vehículos eléctricos y almacenamiento doméstico", material: "Litio + Cobalto" },
      { name: "Electrodos", description: "Electrodos para baterías industriales y sistemas de energía renovable", material: "Grafito + Níquel" },
      { name: "Aleaciones Especiales", description: "Aleaciones de alta resistencia para la industria aeroespacial", material: "Cobalto + Níquel" },
    ],
    impact: { co2PerKg: 9.2, recoveryRate: 95, energySavedKwhPerKg: 110 },
    funFact: "Una tonelada de baterías recicladas evita la emisión de 9.2 toneladas de CO₂ — equivalente a plantar 460 árboles maduros.",
    process: [
      { step: "Recolección", description: "Las baterías se clasifican por química (Li-ion, NiMH, alcalinas)" },
      { step: "Trituración", description: "Se trituran en un ambiente inerte para evitar cortocircuitos" },
      { step: "Separación", description: "Separación magnética y por densidad de metales ferrosos y no ferrosos" },
      { step: "Refinación", description: "Los metales se refinan mediante procesos hidrometalúrgicos" },
      { step: "Reutilización", description: "Los materiales recuperados se venden a fabricantes de baterías" },
    ],
  },
  {
    id: "celulares",
    label: "Celulares",
    icon: Smartphone,
    emoji: "📱",
    description: "Smartphones, tablets y PDAs",
    longDescription:
      "Los teléfonos móviles contienen metales preciosos en cantidades sorprendentes. Una tonelada de celulares contiene más oro que una tonelada de mineral de oro. El reciclaje de estos dispositivos permite recuperar materiales valiosos y evitar la minería destructiva.",
    materials: [
      { name: "Oro", percent: 99, color: "#f59e0b" },
      { name: "Plata", percent: 98, color: "#9ca3af" },
      { name: "Cobre", percent: 97, color: "#f97316" },
      { name: "Paladio", percent: 95, color: "#a855f7" },
    ],
    products: [
      { name: "Nuevos Dispositivos", description: "Circuitos y componentes para smartphones y tablets refurbished", material: "Oro + Cobre" },
      { name: "Joyería Reciclada", description: "Joyas de oro y plata procesados 100% de residuos electrónicos", material: "Oro + Plata" },
      { name: "Componentes Eléctricos", description: "Contactos y conectores para la industria automotriz", material: "Paladio + Cobre" },
    ],
    impact: { co2PerKg: 14.5, recoveryRate: 99, energySavedKwhPerKg: 180 },
    funFact: "Reciclar 35 celulares evita la extracción de 1 tonelada de mineral de oro, y ahorra la energía equivalente a cargar un smartphone por 120 años.",
    process: [
      { step: "Clasificación", description: "Los dispositivos se clasifican por marca y modelo para evaluar reutilización" },
      { step: "Desmontaje", description: "Desmontaje manual para separar baterías, pantallas y placas base" },
      { step: "Triturado", description: "Los componentes se trituran hasta obtener un polvo fino homogéneo" },
      { step: "Refinación Química", description: "Procesos hidrometalúrgicos para extraer oro, plata y paladio" },
      { step: "Fundición", description: "Los metales se funden en lingotes para su reutilización industrial" },
    ],
  },
  {
    id: "monitores",
    label: "Monitores",
    icon: Monitor,
    emoji: "🖥️",
    description: "CRT, LCD, LED y pantallas",
    longDescription:
      "Los monitores y pantallas contienen vidrio de alta calidad, metales y plásticos recuperables. Las pantallas CRT requieren manejo especial por su contenido de plomo, mientras que las LCD/LED ofrecen mayores tasas de reciclaje de materiales valiosos.",
    materials: [
      { name: "Vidrio", percent: 98, color: "#06b6d4" },
      { name: "Estaño", percent: 90, color: "#d946ef" },
      { name: "Plomo", percent: 85, color: "#78716c" },
      { name: "Plástico ABS", percent: 80, color: "#eab308" },
    ],
    products: [
      { name: "Nuevas Pantallas", description: "Vidrio reciclado para fabricación de paneles LCD y LED", material: "Vidrio + Estaño" },
      { name: "Vidrio Arquitectónico", description: "Paneles de vidrio reciclado para construcción sostenible", material: "Vidrio templado" },
      { name: "Aislantes Térmicos", description: "Espumas aislantes fabricadas a partir de plásticos reciclados", material: "Plástico ABS" },
    ],
    impact: { co2PerKg: 6.8, recoveryRate: 92, energySavedKwhPerKg: 85 },
    funFact: "Reciclar un monitor CRT evita que 2-4 kg de plomo contaminen el suelo. Una pantalla LCD reciclada ahorra suficiente energía para iluminar un hogar por 3 días.",
    process: [
      { step: "Clasificación", description: "Separación de CRT, LCD, LED y plasma por tipo de tecnología" },
      { step: "Desmontaje", description: "Extracción de cables, plásticos y componentes electrónicos" },
      { step: "Separación de Vidrio", description: "El vidrio se tritura y se separa por tipo (con o sin plomo)" },
      { step: "Reciclaje de Plásticos", description: "Los marcos y carcasas se muelen y procesan en pellets" },
      { step: "Refinación de Metales", description: "Recuperación de estaño, cobre y metales de las placas electrónicas" },
    ],
  },
  {
    id: "computadoras",
    label: "Computadoras",
    icon: Cpu,
    emoji: "💻",
    description: "PCs, laptops y servidores",
    longDescription:
      "Las computadoras son una de las fuentes más ricas de materiales reciclables en el mundo electrónico. Cada equipo contiene metales preciosos, tierras raras y componentes que pueden ser reutilizados o transformados en nuevos productos industriales.",
    materials: [
      { name: "Aluminio", percent: 95, color: "#14b8a6" },
      { name: "Cobre", percent: 93, color: "#f97316" },
      { name: "Acero", percent: 90, color: "#78716c" },
      { name: "Oro", percent: 97, color: "#f59e0b" },
    ],
    products: [
      { name: "Nuevos Equipos", description: "Computadoras refurbished y componentes para la industria TI", material: "Aluminio + Cobre" },
      { name: "Componentes Industriales", description: "Piezas de aluminio y acero para manufactura y robótica", material: "Aluminio + Acero" },
      { name: "Mobiliario Urbano", description: "Bancas, mesas y estructuras fabricadas con plásticos reciclados", material: "Plásticos ABS" },
    ],
    impact: { co2PerKg: 8.3, recoveryRate: 95, energySavedKwhPerKg: 140 },
    funFact: "Reciclar una laptop ahorra la energía equivalente a 1,000 horas de uso continuo. Una tonelada de computadoras contiene 10 veces más oro que una tonelada de mineral aurífero.",
    process: [
      { step: "Diagnóstico", description: "Evaluación de funcionalidad para posible reacondicionamiento" },
      { step: "Desmontaje", description: "Separación manual en componentes: placa base, disco duro, RAM, fuente" },
      { step: "Triturado", description: "Los componentes no reutilizables se trituran en molinos industriales" },
      { step: "Separación por Densidad", description: "Separación de metales ferrosos, no ferrosos y plásticos" },
      { step: "Fundición y Pellets", description: "Los metales se funden y los plásticos se convierten en pellets" },
    ],
  },
  {
    id: "cables",
    label: "Cables",
    icon: Cable,
    emoji: "🔌",
    description: "Cargadores, USB y conectores",
    longDescription:
      "Los cables y accesorios electrónicos contienen cobre de alta pureza, uno de los materiales más valiosos y demandados para reciclaje. El aislamiento de PVC y otros plásticos también puede ser procesado para nuevos usos industriales.",
    materials: [
      { name: "Cobre", percent: 99, color: "#f97316" },
      { name: "Aluminio", percent: 95, color: "#14b8a6" },
      { name: "PVC", percent: 85, color: "#eab308" },
      { name: "Conectores", percent: 90, color: "#78716c" },
    ],
    products: [
      { name: "Nuevos Cables", description: "Cables eléctricos y de datos fabricados con cobre 100% reciclado", material: "Cobre + PVC" },
      { name: "Tuberías", description: "Tuberías de PVC reciclado para construcción e instalaciones", material: "PVC reciclado" },
      { name: "Filamento 3D", description: "Filamento para impresión 3D a partir de plásticos reciclados de cables", material: "PVC + Plásticos" },
    ],
    impact: { co2PerKg: 5.1, recoveryRate: 99, energySavedKwhPerKg: 65 },
    funFact: "El cobre reciclado de cables conserva el 100% de sus propiedades conductoras. Una tonelada de cables reciclados ahorra la energía que consume un hogar dominicano en 4 meses.",
    process: [
      { step: "Clasificación", description: "Separación por tipo: eléctricos, datos, audio, cargadores" },
      { step: "Granulado", description: "Los cables se cortan en pequeños segmentos para procesamiento" },
      { step: "Separación por Aire", description: "Separación neumática del cobre del aislamiento plástico" },
      { step: "Fundición de Cobre", description: "El cobre se funde y purifica para fabricación de nuevos conductores" },
      { step: "Reciclaje de Plásticos", description: "El PVC se muele y procesa para tuberías y otros productos" },
    ],
  },
  {
    id: "electrodomesticos",
    label: "Electrodomésticos",
    icon: Tv,
    emoji: "🏠",
    description: "Microondas, lavadoras y pequeños",
    longDescription:
      "Los electrodomésticos representan una gran fuente de metales reciclables. Contienen acero, cobre, aluminio y plásticos de ingeniería que pueden ser procesados para fabricar nuevos productos, reduciendo significativamente la demanda de minería.",
    materials: [
      { name: "Acero", percent: 90, color: "#78716c" },
      { name: "Cobre", percent: 88, color: "#f97316" },
      { name: "Plásticos ABS", percent: 80, color: "#eab308" },
      { name: "Vidrio", percent: 85, color: "#06b6d4" },
    ],
    products: [
      { name: "Vigas de Construcción", description: "Acero reciclado para refuerzo estructural y construcción", material: "Acero reciclado" },
      { name: "Autopartes", description: "Componentes metálicos para la industria automotriz", material: "Acero + Aluminio" },
      { name: "Electrodomésticos Reciclados", description: "Nuevos electrodomésticos fabricados con materiales post-consumo", material: "Acero + Cobre + Plásticos" },
    ],
    impact: { co2PerKg: 7.2, recoveryRate: 90, energySavedKwhPerKg: 95 },
    funFact: "Reciclar un microondas ahorra suficiente energía para hervir 3,000 tazas de café. El acero reciclado reduce en 60% las emisiones de CO₂ comparado con acero virgen.",
    process: [
      { step: "Recepción", description: "Clasificación por tipo: línea blanca, pequeños electrodomésticos, cocina" },
      { step: "Desmontaje Manual", description: "Extracción de cables, motores, compresores y componentes tóxicos" },
      { step: "Triturado Industrial", description: "Los equipos se trituran en shredders de alta potencia" },
      { step: "Separación Magnética", description: "Separación de metales ferrosos (acero) y no ferrosos (aluminio, cobre)" },
      { step: "Compactación", description: "Los metales se compactan en pacas para su venta a la industria" },
    ],
  },
  {
    id: "impresoras",
    label: "Impresoras",
    icon: Printer,
    emoji: "🖨️",
    description: "Láser, tinta y multifuncionales",
    longDescription:
      "Las impresoras contienen plásticos de alta calidad, metales y componentes electrónicos recuperables. Los cartuchos de tinta y tóner pueden ser rellenados o reciclados para fabricar nuevos productos, incluyendo filamento para impresión 3D.",
    materials: [
      { name: "Plásticos ABS", percent: 85, color: "#eab308" },
      { name: "Aluminio", percent: 88, color: "#14b8a6" },
      { name: "Acero", percent: 80, color: "#78716c" },
      { name: "Circuitos", percent: 75, color: "#22c55e" },
    ],
    products: [
      { name: "Filamento 3D", description: "Filamento ecológico para impresión 3D hecho de ABS reciclado", material: "ABS reciclado" },
      { name: "Mobiliario Urbano", description: "Bancas y mesas fabricadas con plásticos reciclados de impresoras", material: "Plásticos ABS + Acero" },
      { name: "Nuevas Impresoras", description: "Componentes plásticos y metálicos para manufactura de nuevos equipos", material: "ABS + Aluminio" },
    ],
    impact: { co2PerKg: 5.8, recoveryRate: 85, energySavedKwhPerKg: 75 },
    funFact: "Un cartucho de tinta reciclado ahorra 1 litro de petróleo. En RD se desechan más de 500,000 cartuchos al año — reciclarlos evitaría 500,000 litros de petróleo.",
    process: [
      { step: "Recepción", description: "Separación por tipo: láser, tinta, multifuncional, plotter" },
      { step: "Extracción de Cartuchos", description: "Los cartuchos de tinta y tóner se separan para reciclaje especializado" },
      { step: "Desmontaje", description: "Separación de carcasas plásticas, metales y componentes electrónicos" },
      { step: "Triturado de Plásticos", description: "Los plásticos ABS se muelen y procesan para filamento 3D" },
      { step: "Recuperación de Metales", description: "Aluminio y acero se separan y compactan para reciclaje" },
    ],
  },
  {
    id: "tablets",
    label: "Tablets",
    icon: TabletIcon,
    emoji: "📲",
    description: "iPad, Android y lectores electrónicos",
    longDescription:
      "Las tablets son dispositivos compactos con una alta concentración de materiales valiosos por unidad de peso. Combina lo mejor del reciclaje de celulares y computadoras, con aluminio de alta calidad, vidrio táctil y metales preciosos en sus circuitos.",
    materials: [
      { name: "Aluminio", percent: 95, color: "#14b8a6" },
      { name: "Vidrio Táctil", percent: 90, color: "#06b6d4" },
      { name: "Oro", percent: 97, color: "#f59e0b" },
      { name: "Metales Raros", percent: 88, color: "#a855f7" },
    ],
    products: [
      { name: "Nuevos Dispositivos", description: "Componentes para tablets refurbished y lectores electrónicos", material: "Aluminio + Vidrio" },
      { name: "Señalética Digital", description: "Pantallas recicladas para señalética digital sostenible", material: "Vidrio táctil + Circuitos" },
      { name: "Bisutería Tecnológica", description: "Accesorios y decoración fabricados con componentes reciclados", material: "Aluminio + Metales" },
    ],
    impact: { co2PerKg: 12.1, recoveryRate: 93, energySavedKwhPerKg: 150 },
    funFact: "Reciclar una tablet de 500g ahorra los mismos recursos que extraer 100 kg de mineral de aluminio. El 95% del aluminio de una tablet puede recuperarse sin pérdida de calidad.",
    process: [
      { step: "Clasificación", description: "Evaluación para reacondicionamiento o reciclaje directo" },
      { step: "Desmontaje", description: "Separación de pantalla, batería, placa base y carcasa" },
      { step: "Reciclaje de Batería", description: "La batería de polímero de litio se procesa por separado" },
      { step: "Triturado Fino", description: "Los componentes restantes se trituran para separación de materiales" },
      { step: "Refinación Selectiva", description: "Extracción de metales preciosos y tierras raras de circuitos" },
    ],
  },
  {
    id: "televisores",
    label: "Televisores",
    icon: TvIcon,
    emoji: "📺",
    description: "LED, OLED, QLED y plasma",
    longDescription:
      "Los televisores modernos contienen una combinación única de vidrio templado, metales y plásticos de ingeniería. A diferencia de los CRT antiguos, los televisores LED/OLED no contienen plomo en el vidrio, facilitando su reciclaje y recuperación de materiales.",
    materials: [
      { name: "Vidrio Templado", percent: 97, color: "#06b6d4" },
      { name: "Plásticos", percent: 85, color: "#eab308" },
      { name: "Aluminio", percent: 90, color: "#14b8a6" },
      { name: "Cobre", percent: 88, color: "#f97316" },
    ],
    products: [
      { name: "Nuevas Pantallas", description: "Paneles de vidrio reciclado para fabricación de TVs y monitores", material: "Vidrio templado" },
      { name: "Materiales de Construcción", description: "Paneles aislantes y materiales compuestos para construcción", material: "Plásticos reciclados" },
      { name: "Componentes Electrónicos", description: "Circuitos y conectores recuperados para dispositivos refurbished", material: "Cobre + Circuitos" },
    ],
    impact: { co2PerKg: 6.2, recoveryRate: 92, energySavedKwhPerKg: 80 },
    funFact: "Un televisor LED reciclado ahorra el 95% de la energía necesaria para fabricar uno nuevo desde cero. En 2024, se reciclaron solo el 25% de los TVs desechados en LATAM.",
    process: [
      { step: "Clasificación", description: "Separación por tecnología: LED, OLED, QLED, plasma" },
      { step: "Desmontaje", description: "Extracción de pantalla, carcasa, cables y placa fuente" },
      { step: "Separación de Vidrio", description: "El panel de vidrio se separa de las capas polarizadoras y filtros" },
      { step: "Triturado", description: "Los plásticos y metales se trituran para reciclaje por separado" },
      { step: "Refinación de Metales", description: "Recuperación de aluminio, cobre y metales de las placas" },
    ],
  },
  {
    id: "consolas",
    label: "Consolas",
    icon: Gamepad2,
    emoji: "🎮",
    description: "PlayStation, Xbox, Nintendo y retro",
    longDescription:
      "Las consolas de videojuegos contienen plásticos ABS de alta resistencia, metales y circuitos especializados. Muchas consolas vintage tienen valor de colección, pero aquellas que no pueden ser reacondicionadas ofrecen materiales excelentes para reciclaje.",
    materials: [
      { name: "Plásticos ABS", percent: 85, color: "#eab308" },
      { name: "Cobre", percent: 88, color: "#f97316" },
      { name: "Aluminio", percent: 82, color: "#14b8a6" },
      { name: "Metales Preciosos", percent: 90, color: "#f59e0b" },
    ],
    products: [
      { name: "Dispositivos Refurbished", description: "Consolas restauradas con componentes reciclados para reventa social", material: "Circuitos + Plásticos" },
      { name: "Arte Electrónico", description: "Esculturas y arte digital fabricado con componentes de consolas", material: "Plásticos + LEDs" },
      { name: "Componentes de Arcade", description: "Partes recicladas para máquinas arcade y proyectos DIY", material: "Circuitos + Metales" },
    ],
    impact: { co2PerKg: 6.5, recoveryRate: 85, energySavedKwhPerKg: 90 },
    funFact: "La consola más reciclada del mundo es la PlayStation 2. Se estima que solo el 15% de las 155 millones de PS2 vendidas han sido recicladas adecuadamente.",
    process: [
      { step: "Diagnóstico", description: "Evaluación de funcionamiento para posible reacondicionamiento" },
      { step: "Desmontaje", description: "Separación de carcasa, placa madre, ventilador y fuente de poder" },
      { step: "Separación de Plásticos", description: "Las carcasas ABS se muelen para reciclaje de alta calidad" },
      { step: "Recuperación de Circuitos", description: "Los componentes electrónicos se clasifican por valor de materiales" },
      { step: "Refinación de Metales", description: "Extracción de cobre, aluminio y metales preciosos de circuitos" },
    ],
  },
]

export function getDeviceType(id: string): DeviceType | undefined {
  return deviceTypes.find((t) => t.id === id)
}
