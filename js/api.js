window.API = (function () {
  const disabilities = [
    {
      id: 1,
      type: "visual",
      nameAr: "دعم بصري",
      nameEn: "Visual Support",
      descriptionAr: "أدوات تساعد على قراءة المحتوى بوضوح مثل الصوت وتكبير النصوص.",
      descriptionEn: "Tools that help read content clearly, such as voice and text zoom.",
      features: [
        { icon: "🔊", nameAr: "قارئ صوتي", nameEn: "Voice Reader" },
        { icon: "🔍", nameAr: "تكبير النصوص", nameEn: "Text Zoom" },
        { icon: "🟢", nameAr: "ألوان مريحة", nameEn: "Comfort Colors" },
      ],
    },
    {
      id: 2,
      type: "hearing",
      nameAr: "دعم سمعي",
      nameEn: "Hearing Support",
      descriptionAr: "تنبيهات ضوئية وتفاعل بصري واضح أثناء استخدام الموقع.",
      descriptionEn: "Light alerts and clear visual interaction while using the website.",
      features: [
        { icon: "💡", nameAr: "تنبيهات ضوئية", nameEn: "Light Alerts" },
        { icon: "👁️", nameAr: "إشارات بصرية", nameEn: "Visual Cues" },
      ],
    },
    {
      id: 3,
      type: "motor",
      nameAr: "دعم حركي",
      nameEn: "Motor Support",
      descriptionAr: "واجهة بسيطة وأزرار واضحة لتسهيل الوصول للخدمات.",
      descriptionEn: "Simple interface and clear buttons to access services easily.",
      features: [
        { icon: "🖱️", nameAr: "أزرار واضحة", nameEn: "Clear Buttons" },
        { icon: "📱", nameAr: "تصميم سهل", nameEn: "Easy Design" },
      ],
    },
  ];

  const services = [
    {
      id: 1,
      icon: "🚗",
      nameAr: "التنقل",
      nameEn: "Transportation",
      descriptionAr: "نقل آمن ومريح إلى الوجهة المطلوبة.",
      descriptionEn: "Safe and comfortable transport to your destination.",
      options: [
        {
          id: 101,
          nameAr: "نقل داخل المدينة",
          nameEn: "City Transport",
          descriptionAr: "خدمة تنقل داخل المدينة بسيارة مجهزة.",
          descriptionEn: "Transportation inside the city with an equipped car.",
          priceBase: 35,
        },
        {
          id: 102,
          nameAr: "نقل مع مرافق",
          nameEn: "Transport with Assistant",
          descriptionAr: "تنقل مع مرافق يساعدك أثناء الرحلة.",
          descriptionEn: "Transport with an assistant during the trip.",
          priceBase: 80,
        },
      ],
    },
    {
      id: 2,
      icon: "🤝",
      nameAr: "الدعم الشخصي",
      nameEn: "Personal Support",
      descriptionAr: "مساعدة شخصية في الأماكن العامة والمستشفيات والمدارس.",
      descriptionEn: "Personal assistance in public places, hospitals, and schools.",
      options: [
        {
          id: 201,
          nameAr: "دعم في الأماكن العامة",
          nameEn: "Public Places Support",
          descriptionAr: "مرافق يساعدك في المول أو الحديقة أو أي مكان عام.",
          descriptionEn: "An assistant in malls, parks, or public places.",
          priceBase: 75,
        },
        {
          id: 202,
          nameAr: "دعم في المستشفى",
          nameEn: "Hospital Support",
          descriptionAr: "مرافق يساعدك أثناء المواعيد الطبية.",
          descriptionEn: "An assistant during medical appointments.",
          priceBase: 95,
        },
      ],
    },
    {
      id: 3,
      icon: "⚡",
      nameAr: "الطلب السريع",
      nameEn: "Quick Order",
      descriptionAr: "طلب سريع للاحتياجات اليومية.",
      descriptionEn: "Quick ordering for daily needs.",
      options: [
        {
          id: 301,
          nameAr: "طلب أغراض",
          nameEn: "Item Delivery",
          descriptionAr: "إحضار أغراض بسيطة من المتجر.",
          descriptionEn: "Bring simple items from a store.",
          priceBase: 25,
        },
      ],
    },
    {
      id: 4,
      icon: "🛠️",
      nameAr: "الصيانة",
      nameEn: "Maintenance",
      descriptionAr: "خدمات صيانة منزلية بسيطة.",
      descriptionEn: "Simple home maintenance services.",
      options: [
        {
          id: 401,
          nameAr: "صيانة منزلية",
          nameEn: "Home Maintenance",
          descriptionAr: "طلب فني لصيانة بسيطة في المنزل.",
          descriptionEn: "Request a technician for simple home maintenance.",
          priceBase: 60,
        },
      ],
    },
  ];

  function getUser() {
    return JSON.parse(localStorage.getItem("wasal_user") || "null");
  }

  function setUser(user) {
    localStorage.setItem("wasal_user", JSON.stringify(user));
    localStorage.setItem(Config.KEYS.TOKEN, "demo-token");
  }

  function getOrdersStore() {
    return JSON.parse(localStorage.getItem("wasal_orders") || "[]");
  }

  function setOrdersStore(orders) {
    localStorage.setItem("wasal_orders", JSON.stringify(orders));
  }

  function findServiceByOption(optionId) {
    for (const category of services) {
      const option = category.options.find((o) => o.id === Number(optionId));
      if (option) return { category, option };
    }
    return null;
  }

  function wait(data) {
    return new Promise((resolve) => setTimeout(() => resolve(data), 200));
  }

  return {
    getMe: () => wait(getUser()),

    login: (body) => {
      const user = {
        id: 1,
        name: body.email.split("@")[0],
        email: body.email,
        phone: "",
      };
      setUser(user);
      return wait({ token: "demo-token", user });
    },

    register: (body) => {
      const user = {
        id: 1,
        name: body.name,
        email: body.email,
        phone: body.phone,
      };
      setUser(user);
      return wait({ token: "demo-token", user });
    },

    getDisabilities: () => wait(disabilities),

    getDisability: (id) =>
      wait(disabilities.find((d) => d.id === Number(id))),

    getServices: () => wait(services),

    getService: (id) =>
      wait(services.find((s) => s.id === Number(id))),

    createOrder: (body) => {
      const found = findServiceByOption(body.serviceOptionId);
      const orders = getOrdersStore();

      const basePrice = found ? Number(found.option.priceBase) : 0;
      const additionalFee = body.additionalFee ? Number(body.additionalFee) : 0;

      const order = {
        id: Date.now(),
        serviceOptionId: body.serviceOptionId,
        serviceOption: found ? found.option : null,
        serviceCategory: found ? found.category : null,
        locationFrom: body.locationFrom,
        locationTo: body.locationTo,
        scheduledDate: body.scheduledDate,
        scheduledTime: body.scheduledTime,
        notes: body.notes,
        basePrice,
        additionalFee,
        totalPrice: basePrice + additionalFee,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      orders.unshift(order);
      setOrdersStore(orders);
      return wait(order);
    },

    confirmOrder: (id) => {
      const orders = getOrdersStore();
      const order = orders.find((o) => o.id === Number(id));
      if (order) order.status = "confirmed";
      setOrdersStore(orders);
      return wait(order);
    },

    cancelOrder: (id) => {
      const orders = getOrdersStore();
      const order = orders.find((o) => o.id === Number(id));
      if (order) order.status = "cancelled";
      setOrdersStore(orders);
      return wait(order);
    },

    getOrders: () => wait(getOrdersStore()),

    getOrdersSummary: () => {
      const orders = getOrdersStore();
      const summary = {
        total: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        confirmed: orders.filter((o) => o.status === "confirmed").length,
        cancelled: orders.filter((o) => o.status === "cancelled").length,
        completed: orders.filter((o) => o.status === "completed").length,
        totalSpent: orders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0),
      };
      return wait(summary);
    },

    getOrder: (id) =>
      wait(getOrdersStore().find((o) => o.id === Number(id))),
  };
})();