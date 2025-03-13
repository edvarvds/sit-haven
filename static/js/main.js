// Add flavor URL mapping at the top of the file
const FLAVOR_CHECKOUT_URLS = {
    'Natural': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Chocolate': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Morango': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Baunilha': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Banana': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Beijinho': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Brigadeiro': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Cappuccino': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Caramelo': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Chocolate Branco': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Chocolate com Amendoim': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Chocolate com Morango': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Cookies & Cream': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Doce de Leite': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Leite em Pó': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Mousse de Maracujá': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Sorvete de Creme': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj',
    'Torta de Limão': 'https://pay.pagamento-suplementos.com/NDr8gm21xWp3Bmj'
};

// Function declarations at the top
function startCheckout(flavor = 'Natural') {
    const loadingOverlay = document.getElementById('loading-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const fixedBuyButton = document.getElementById('fixed-buy-button');

    if (!loadingOverlay || !cartSidebar) {
        console.error('Required elements not found');
        return;
    }

    // Close cart sidebar
    cartSidebar.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');

    // Show loading overlay
    loadingOverlay.classList.remove('hidden');
    updateFloatingButtonVisibility();

    // Use selected flavor URL
    const checkoutUrl = FLAVOR_CHECKOUT_URLS[flavor] || FLAVOR_CHECKOUT_URLS['Natural'];

    // Show loading for 3 seconds before redirecting
    setTimeout(() => {
        window.location.href = checkoutUrl;
    }, 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

function addToCart(productName, price, flavor = 'Natural') {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Create cart item element
    const itemElement = document.createElement('div');
    itemElement.className = 'flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm';
    itemElement.innerHTML = `
        <div class="flex items-start gap-3">
            <img src="https://i.ibb.co/39dFsdzw/Design-sem-nome.png" alt="${productName}" class="w-20 h-20 object-cover rounded-md">
            <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">${productName}</h4>
                <p class="text-sm text-primary font-medium mt-1">${formatPrice(price)}</p>
                <p class="text-sm text-gray-600 mt-1">Sabor: ${flavor}</p>
                <div class="mt-2 text-xs text-gray-500 space-y-1">
                    <p>1x PISTOLA AIRSOFT M92</p>
                    <p>1x MUNIÇÕES BBs 1000un</p>
                    <p>6x CÁPSULAS CO2 12g</p>
                    <p>1x PAC ALVOS 100un</p>
                    <p>1x MALETA ROSSI</p>
                    <p>1x COLDRE TÁTICO</p>
                    <p>1x MAGAZINE M92</p>
                    <p>1x PATCH ROSSI</p>
                </div>
            </div>
            <button onclick="removeFromCart(this.closest('.flex.flex-col'))" class="text-gray-400 hover:text-red-500 transition">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    cartItems.appendChild(itemElement);
    updateCartCount();
    updateCartTotal();

    // Store the selected flavor for checkout
    itemElement.dataset.flavor = flavor;

    // Open cart sidebar
    toggleCart();
}

function removeFromCart(cartItem) {
    cartItem.remove();
    updateCartCount();
    updateCartTotal();
}

function updateCartTotal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    Array.from(cartItems.children).forEach(item => {
        const priceElement = item.querySelector('.text-primary');
        const price = parseFloat(priceElement.textContent.replace(/[^0-9,.]/g, '').replace(',', '.'));
        total += price;
    });
    cartTotal.textContent = formatPrice(total);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    cartCount.textContent = cartItems.children.length;

    // Enable/disable checkout button based on cart items
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.disabled = cartItems.children.length === 0;

    // Update onclick handler for checkout button when enabled
    if (!checkoutButton.disabled) {
        checkoutButton.onclick = () => {
            // Get the flavor from the first item in cart
            const firstItem = cartItems.querySelector('.flex.flex-col');
            const flavor = firstItem ? firstItem.dataset.flavor || 'Natural' : 'Natural';
            startCheckout(flavor);
        };
    }
}

function toggleSideMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('-translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

function toggleCart() {
    const cart = document.getElementById('cart-sidebar');
    cart.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}


// Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-product-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const indicatorsContainer = document.getElementById('imageIndicators');

    let currentImageIndex = 0;
    const images = Array.from(thumbnails).map(thumb => ({
        src: thumb.src,
        alt: thumb.alt
    }));

    // Create indicators
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `h-2 w-2 rounded-full bg-white/60 hover:bg-white/90 cursor-pointer transition-all ${index === 0 ? 'bg-white' : ''}`;
        indicator.addEventListener('click', () => showImage(index));
        indicatorsContainer.appendChild(indicator);
    });

    function updateIndicators() {
        Array.from(indicatorsContainer.children).forEach((indicator, index) => {
            indicator.className = `h-2 w-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/60 hover:bg-white/90'
            } cursor-pointer`;
        });
    }

    function showImage(index) {
        // Add fade out effect
        mainImage.style.opacity = '0';

        setTimeout(() => {
            mainImage.src = images[index].src;
            mainImage.alt = images[index].alt;
            currentImageIndex = index;

            // Update thumbnails
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('ring-2', i === index);
                thumb.classList.toggle('ring-primary', i === index);
            });

            // Update indicators
            updateIndicators();

            // Add fade in effect
            mainImage.style.opacity = '1';
        }, 200); // Match this with CSS transition duration
    }

    // Add click handlers for navigation buttons
    prevButton.addEventListener('click', () => {
        const newIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(newIndex);
    });

    nextButton.addEventListener('click', () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        showImage(newIndex);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // Add click handlers for thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => showImage(index));
    });

    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    mainImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                nextButton.click();
            } else {
                // Swipe right
                prevButton.click();
            }
        }
    }

    // Add hover effect for navigation buttons
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        button.addEventListener('mouseleave', () => {
            button.style.opacity = '0.8';
        });
    });

    // Initialize first thumbnail as active
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('ring-2', 'ring-primary');
    }
});

// Atualizar região do frete
document.addEventListener('DOMContentLoaded', function() {
    fetch("https://wtfismyip.com/json")
        .then(response => response.json())
        .then(localizacao => {
            const regiao = localizacao['YourFuckingLocation'].replace(", Brazil", "");
            document.getElementById("custom-address").innerHTML = `para <b>${regiao} e Região</b>`;
        })
        .catch(() => {
            // Em caso de erro, mantém o texto padrão
            console.log("Não foi possível atualizar a região");
        });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// CEP mask and validation
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5);
            }
            e.target.value = value;
        });
    }
});

// Calculate delivery
async function calculateDelivery() {
    const cepInput = document.getElementById('cep');
    const deliveryResult = document.getElementById('delivery-result');
    const deliveryAddress = document.getElementById('delivery-address');
    const calculateButton = document.getElementById('calculate-delivery-btn');
    const buttonText = calculateButton.querySelector('span');
    const loadingIcon = calculateButton.querySelector('.fa-spinner');

    if (!cepInput || !deliveryResult || !deliveryAddress || !calculateButton) return;

    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido');
        return;
    }

    // Show loading state
    calculateButton.disabled = true;
    calculateButton.classList.add('opacity-75');
    buttonText.textContent = 'Calculando...';
    loadingIcon.classList.remove('hidden');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado');
            return;
        }

        // Format address display
        const address = `${data.localidade}, ${data.uf}`;
        deliveryAddress.textContent = address;

        // Show delivery result
        deliveryResult.classList.remove('hidden');

    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        alert('Erro ao consultar o CEP. Por favor, tente novamente.');
    } finally {
        // Reset button state
        calculateButton.disabled = false;
        calculateButton.classList.remove('opacity-75');
        buttonText.textContent = 'Calcular';
        loadingIcon.classList.add('hidden');
    }
}


// Reviews functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewsList = document.querySelector('.reviews-list');
    const loadMoreButton = document.querySelector('#load-more-reviews');
    let currentReviews = 5;

    // Colors for avatars
    const avatarColors = [
        { bg: 'bg-blue-100', text: 'text-blue-600' },
        { bg: 'bg-pink-100', text: 'text-pink-600' },
        { bg: 'bg-purple-100', text: 'text-purple-600' },
        { bg: 'bg-green-100', text: 'text-green-600' },
        { bg: 'bg-yellow-100', text: 'text-yellow-600' },
        { bg: 'bg-indigo-100', text: 'text-indigo-600' },
        { bg: 'bg-red-100', text: 'text-red-600' },
        { bg: 'bg-teal-100', text: 'text-teal-600' }
    ];

    // Review images array
    const reviewImages = [
        'https://m.media-amazon.com/images/I/61tv6dsB1hL.jpg',
        'https://m.media-amazon.com/images/I/71pyE4uWV4L.jpg',
        'https://m.media-amazon.com/images/I/61vuqnfVrEL.jpg',
        'https://m.media-amazon.com/images/I/71OTdopTa6L.jpg',
        'https://m.media-amazon.com/images/I/61t1A-kAPXL.jpg',
        'https://m.media-amazon.com/images/I/71q4om4B+HL.jpg'
    ];

    // Extended reviews array
    const reviews = [
        {
            name: 'Carlos Andrade',
            initials: 'CA',
            rating: 5,
            title: 'Qualidade excelente',
            comment: 'Ar condicionado incrível! Refrigera muito bem, é silencioso e o consumo de energia é baixo. A instalação foi rápida e fácil. Recomendo demais!',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[0]
        },
        {
            name: 'Fernanda Lima',
            initials: 'FL',
            rating: 5,
            title: 'Ótimo custo-benefício',
            comment: 'Esse ar condicionado é simplesmente sensacional! Qualidade superior e preço justo. A Elgin nunca decepciona! Minha casa ficou muito mais confortável.',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[1]
        },
        {
            name: 'João Ricardo',
            initials: 'JR',
            rating: 5,
            title: 'Melhor compra que fiz',
            comment: 'O ar condicionado é super silencioso, refrigera rapidamente o ambiente e o aplicativo de controle funciona perfeitamente. Comprarei novamente com certeza!',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[2]
        },
        {
            name: 'Mariana Souza',
            initials: 'MS',
            rating: 5,
            title: 'Refrigeração perfeita',
            comment: 'Já testei vários modelos e esse ar condicionado é perfeito! Potente, eficaz e com um preço excelente. A função sleep é ótima para economizar energia à noite!',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[3]
        },
        {
            name: 'Rodrigo Ferreira',
            initials: 'RF',
            rating: 5,
            title: 'Superou minhas expectativas',
            comment: 'Qualidade top! O ar condicionado tem tudo o que eu precisava, refrigera rapidamente e é super econômico. Recomendo para quem busca conforto sem gastar muito com energia!',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[4]
        },
        {
            name: 'Aline Rocha',
            initials: 'AR',
            rating: 5,
            title: 'Melhor ar condicionado do mercado',
            comment: 'Nada melhor que esse ar condicionado para garantir conforto nos dias quentes. Instalação simples, design moderno e refrigeração potente!',
            verified: true,
            date: new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                .replace('.', ''),
            image: reviewImages[5]
        },
        // Generate 48 more reviews
        ...Array.from({ length: 48 }, (_, i) => {
            const names = [
                'Lucas Henrique', 'Fernando Almeida',
                'Gabriel Nunes', 'Ricardo Carvalho', 'Matheus Santana', 'Diego Martins',
                'Leonardo Souza', 'João Victor', 'André Felipe', 'Pedro Henrique',
                'Thiago Mendes', 'Bruno Ribeiro', 'Rodrigo Campos', 'Daniel Moreira',
                'Felipe Araújo', 'Rafael Duarte', 'Guilherme Fonseca', 'Vitor Hugo', 'Caio César',
                'Henrique Bastos', 'Eduardo Lima', 'Alex Sandro', 'Samuel Torres', 'Miguel Rocha',
                'Arthur Silveira', 'Vinícius Gomes', 'César Monteiro', 'Roberto Farias', 'Fábio Assis',
                'Hugo Nascimento', 'Marcelo Tavares', 'Renato Borges', 'Sérgio Paiva', 'Adriano Castro',
                'Wilson Ferreira', 'Everton Moraes', 'Rômulo Vasconcelos', 'Luciano Mendes', 'Nelson Teixeira'
            ];

            const titles = [
                'Refrigeração eficiente', 'Compra acertada',
                'Top de linha', 'Conforto máximo', 'Investimento que vale a pena',
                'Excedeu minhas expectativas', 'Recomendo sem dúvidas', 'Produto excelente',
                'Transformou minha casa', 'A melhor escolha', 'Impressionado com a qualidade',
                'Surpreendente', 'Melhor do mercado', 'Valeu cada centavo',
                'Eficiente e silencioso', 'Aprovado!', 'Indispensável para dias quentes',
                'Consistência e qualidade', 'Ótimo para o dia a dia', 'Minha casa ficou mais fresca',
                'Indicação certeira', 'Produto de alto nível', 'Simplesmente incrível',
                'Não fico mais sem', 'Ótimo custo-benefício', 'Perfeito para o meu apartamento',
                'Resultados imediatos', 'Eficácia garantida'
            ];
            const comments = [
                'Produto excelente, refrigera rapidamente e mantém a temperatura estável.',
                'A qualidade do ar condicionado é perceptível. Silencioso e eficiente.',
                'Meu conforto em casa melhorou muito desde que instalei este ar condicionado.',
                'Ótimo custo-benefício, realmente senti diferença na refrigeração do ambiente.',
                'Ganhei mais qualidade de vida com este aparelho. Recomendo!',
                'Surpreendido com a eficiência! Melhor ar condicionado que já experimentei.',
                'Ajuda bastante nos dias quentes e o consumo de energia é baixo.',
                'Entrega rápida e produto de alta qualidade. Nota 10!',
                'Uso há algum tempo e realmente faz diferença no conforto da minha casa.',
                'Gostei muito, o design é moderno e a refrigeração é potente.',
                'Me deu um conforto extra para trabalhar em home office nos dias quentes.',
                'Já testei várias marcas, mas essa realmente entrega o que promete.',
                'Perfeito para quem busca refrigeração eficiente e economia de energia.',
                'Instalação incrível e fácil de operar com o controle remoto.',
                'Ótimo para refrigerar ambientes grandes sem consumir muita energia.',
                'Produto muito bem projetado, senti a diferença na temperatura rapidamente.',
                'Ideal para quem mora em regiões quentes e precisa de refrigeração eficiente.',
                'A melhor escolha para quem quer conforto térmico real e consistente.',
                'Ar condicionado essencial para melhorar a qualidade do sono nas noites quentes.',
                'Muito satisfeito com os resultados, valeu cada centavo.',
                'Já virou parte do meu dia a dia, recomendo para todos que sofrem com o calor.',
                'Ótima distribuição do ar frio e sem barulho irritante.',
                'Tive uma redução considerável na temperatura do meu quarto em minutos.',
                'Melhor ar condicionado que já comprei, qualidade e eficiência impecáveis.',
                'Ganhei mais conforto em casa e não sinto mais o calor insuportável do verão.',
                'Funciona muito bem e não consome tanta energia quanto eu esperava.',
                'Composição top, melhor que muitas marcas famosas.',
                'Fiquei impressionado com a refrigeração logo nos primeiros minutos de uso.',
                'Comprarei novamente, atendeu todas as minhas expectativas.',
                'Ótimo ar condicionado, essencial para quem busca conforto térmico e economia.'
            ];

            const randomName = names[Math.floor(Math.random() * names.length)];
            const initials = randomName.split(' ').map(n => n[0]).join('');
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            const randomComment = comments[Math.floor(Math.random() * comments.length)];
            const randomRating = Math.random() < 0.8 ? 5 : 4;
            const image = i < 3 ? reviewImages[i + 2] : null;

            const day = Math.floor(Math.random() * 28) + 1;
            const date = new Date(Date.now() - (Math.random() < 0.5 ? 0 : 86400000))
                  .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                  .replace('.', '');;

            return {
                name: randomName,
                initials: initials,
                rating: randomRating,
                title: randomTitle,
                comment: randomComment,
                verified: true,
                date: date,
                image: null
            };
        })
    ];

    function createReviewElement(review, colorIndex) {
        const colors = avatarColors[colorIndex % avatarColors.length];
        const reviewElement = document.createElement('div');
        reviewElement.className = 'bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300';

        let imageHtml = review.image ? `
            <div class="mt-4">
                <img src="${review.image}" 
                     alt="Review image" 
                     class="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                     onclick="openImageModal('${review.image}')"
                />
            </div>
        ` : '';

        reviewElement.innerHTML = `
            <div class="space-y-4">
                <!-- Header with profile photo and name -->
                <div class="flex items-center">
                    <div class="${colors.bg} w-12 h-12 rounded-full flex items-center justify-center ${colors.text} font-medium text-lg mr-4">
                        ${review.initials}
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900">${review.name}</h4>
                        <div class="flex text-yellow-500 mt-1">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                        </div>
                    </div>
                </div>

                <!-- Review details -->
                <div class="w-full">
                    <div class="flex items-center text-sm text-gray-500 mb-2">
                        <span>${review.date}</span>
                        <span class="mx-2">•</span>
                        <span class="flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-1"></i>
                            Compra verificada
                        </span>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">${review.title}</h3>
                    <p class="text-gray-600">${review.comment}</p>
                    ${imageHtml}
                </div>
            </div>
        `;
        return reviewElement;
    }

    function loadMoreReviews() {
        const fragment = document.createDocumentFragment();
        const startIndex = reviewsList.children.length;
        const endIndex = Math.min(startIndex + 5, reviews.length);

        // Show loading state
        loadMoreButton.disabled = true;
        loadMoreButton.innerHTML = `
            <i class="fas fa-spinner fa-spin mr-2"></i>
            <span>Carregando mais avaliações...</span>
        `;

        setTimeout(() => {
            for (let i = startIndex; i < endIndex; i++) {
                fragment.appendChild(createReviewElement(reviews[i], i));
            }

            reviewsList.appendChild(fragment);

            // Reset button state
            loadMoreButton.disabled = false;
            loadMoreButton.innerHTML = `
                <span>Ver Mais Avaliações</span>
                <i class="fas fa-chevron-down ml-2"></i>
            `;

            // Hide button if no more reviews
            if (endIndex >= reviews.length) {
                loadMoreButton.style.display = 'none';
            }
        }, 1000);
    }

    if (loadMoreButton && reviewsList) {
        // Load initial reviews
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < Math.min(5, reviews.length); i++) {
            fragment.appendChild(createReviewElement(reviews[i], i));
        }
        reviewsList.appendChild(fragment);

        // Add click handler for load more button
        loadMoreButton.addEventListener('click', loadMoreReviews);
    }

    // Update ratings statistics
    const ratingsStats = {
        5: 80,
        4: 15,
        3: 3,
        2: 1,
        1: 1
    };

    // Fixed average rating for 867 reviews
    document.getElementById('average-rating').textContent = '4.8';
    document.getElementById('total-reviews').textContent = '867';

    Object.entries(ratingsStats).forEach(([stars, percentage]) => {
        const progressBar = document.querySelector(`#rating-bar-${stars} .progress-bar`);
        const percentageElement = document.querySelector(`#rating-bar-${stars} .percentage`);
        if (progressBar && percentageElement) {
            progressBar.style.width = `${percentage}%`;
            percentageElement.textContent = `${percentage}%`;
        }
    });
});

// Modal and Review Form functionality
function openReviewModal() {
    const modal = document.getElementById('review-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateStarRating(5); // Reset to 5 stars by default
    updateFloatingButtonVisibility(); // Added to hide floating button
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    resetReviewForm();
    updateFloatingButtonVisibility(); // Added to show floating button
}

function resetReviewForm() {
    const form = document.getElementById('review-form');
    form.reset();
    updateStarRating(5); // Reset to 5 stars
}

function updateStarRating(rating) {
    const stars = document.querySelectorAll('#rating-stars button');
    const ratingInput = document.getElementById('review-rating');

    stars.forEach((star, index) => {
        const starIcon = star.querySelector('i');
        if (index < rating) {
            starIcon.className = 'fas fa-star';
            star.classList.add('text-yellow-500');
            star.classList.remove('text-gray-300');
        } else {
            starIcon.className = 'far fa-star';
            star.classList.add('text-gray-300');
            star.classList.remove('text-yellow-500');
        }
    });

    ratingInput.value = rating;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star rating system
    const ratingStars = document.querySelectorAll('#rating-stars button');
    ratingStars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.closest('button').dataset.rating);
            updateStarRating(rating);
        });

        // Add hover effect
        star.addEventListener('mouseenter', (e) => {
            const rating = parseInt(e.target.closest('button').dataset.rating);
            const stars = document.querySelectorAll('#rating-stars button');
            stars.forEach((s, index) => {
                const starIcon = s.querySelector('i');
                if (index < rating) {
                    starIcon.className = 'fas fa-star';
                    s.classList.add('text-yellow-500');
                    s.classList.remove('text-gray-300');
                }
            });
        });

        star.addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('review-rating').value);
            updateStarRating(currentRating);
        });
    });

    // Handle form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = reviewForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('span');
            const loadingIcon = submitButton.querySelector('.fa-spinner');

            // Show loading state
            submitButton.disabled = true;
            buttonText.textContent = 'Enviando...';
            loadingIcon.classList.remove('hidden');

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get formdata
                const formData = {
                    name: document.getElementById('review-name').value,
                    email: document.getElementById('review-email').value,
                    title: document.getElementById('review-title').value,
                    rating: parseInt(document.getElementById('review-rating').value),
                    comment: document.getElementById('review-comment').value
                };

                // Create new review element
                const reviewElement = createReviewElement({
                    name: formData.name,
                    initials: formData.name.split(' ').map(n => n[0]).join(''),
                    rating: formData.rating,
                    title: formData.title,
                    comment: formData.comment,
                    verified: true,
                    date: 'Hoje' // Placeholder date
                }, Math.floor(Math.random() * avatarColors.length));

                // Add new review to the list
                const reviewsList = document.querySelector('.reviews-list');
                reviewsList.insertBefore(reviewElement, reviewsList.firstChild);

                // Close modal and reset form
                closeReviewModal();

                // Show success message
                alert('Avaliação enviada com sucesso!');

            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Erro ao enviar avaliação. Por favor, tente novamente.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                buttonText.textContent = 'Publicar avaliação';
                loadingIcon.classList.add('hidden');
            }
        });
    }
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeReviewModal();
            }
        });
    }
});

// Image modal functionality
function openImageModal(imageUrl) {
    const modal = document.getElementById('image-modal');
    const img = modal.querySelector('img');
    img.src = imageUrl;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
});

// Menu and Cart functionality
function toggleSideMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('-translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

function toggleCart() {
    const cart = document.getElementById('cart-sidebar');
    cart.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    cartCount.textContent = cartItems.children.length;

    // Enable/disable checkout button based on cart items
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.disabled = cartItems.children.length === 0;

    // Update onclick handler for checkout button when enabled
    if (!checkoutButton.disabled) {
        checkoutButton.onclick = () => {
            // Get the flavor from the first item in cart
            const firstItem = cartItems.querySelector('.flex.flex-col');
            const flavor = firstItem ? firstItem.dataset.flavor || 'Natural' : 'Natural';
            startCheckout(flavor);
        };
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Updating cart item content in addToCart function
function addToCart(productName, price, flavor = 'Natural') {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Create cart item element
    const itemElement = document.createElement('div');
    itemElement.className = 'flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm';
    itemElement.innerHTML = `
        <div class="flex items-start gap-3">
            <img src="https://i.ibb.co/39dFsdzw/Design-sem-nome.png" alt="${productName}" class="w-20 h-20 object-cover rounded-md">
            <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">${productName}</h4>
                <p class="text-sm text-primary font-medium mt-1">${formatPrice(price)}</p>
                <p class="text-sm text-gray-600 mt-1">Sabor: ${flavor}</p>
                <div class="mt-2 text-xs text-gray-500 space-y-1">
                    <p>1x PISTOLA AIRSOFT M92</p>
                    <p>1x MUNIÇÕES BBs 1000un</p>
                    <p>6x CÁPSULAS CO2 12g</p>
                    <p>1x PAC ALVOS 100un</p>
                    <p>1x MALETA ROSSI</p>
                    <p>1x COLDRE TÁTICO</p>
                    <p>1x MAGAZINE M92</p>
                    <p>1x PATCH ROSSI</p>
                </div>
            </div>
            <button onclick="removeFromCart(this.closest('.flex.flex-col'))" class="text-gray-400 hover:text-red-500 transition">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    cartItems.appendChild(itemElement);
    updateCartCount();
    updateCartTotal();

    // Store the selected flavor for checkout
    itemElement.dataset.flavor = flavor;

    // Open cart sidebar
    toggleCart();
}

function removeFromCart(cartItem) {
    cartItem.remove();
    updateCartCount();
    updateCartTotal();
}

function updateCartTotal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    Array.from(cartItems.children).forEach(item => {
        const priceElement = item.querySelector('.text-primary');
        const price = parseFloat(priceElement.textContent.replace(/[^0-9,.]/g, '').replace(',', '.'));
        total += price;
    });
    cartTotal.textContent = formatPrice(total);
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Adicionar ao carrinho')) {
            button.addEventListener('click', function() {
                const flavorSelect = this.closest('.product-card').querySelector('select');
                const selectedFlavor = flavorSelect ? flavorSelect.value : 'Natural';
                addToCart(
                    'Pistola Airsoft GBB Rossi Beretta M92',
                    189.90,
                    selectedFlavor
                );
            });
        }
    });

    // Initialize cart count
    updateCartCount();

    // Add click handler for checkout button - REMOVED DUPLICATE
});

// Add floating button functionality
function handleBuyButtonClick(e) {
    const flavorSelect = document.querySelector('.flavor-select');
    if (!flavorSelect || !flavorSelect.value) {
        e.preventDefault();
        // Scroll to flavor select
        flavorSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add highlight animation
        flavorSelect.classList.add('ring-4', 'ring-primary', 'ring-opacity-50', 'animate-pulse');
        setTimeout(() => {
            flavorSelect.classList.remove('ring-4', 'ring-primary', 'ring-opacity-50', 'animate-pulse');
        }, 2000);

        return false;
    }
    startCheckout(flavorSelect.value);
}

// Update floating button visibility based on modals
function updateFloatingButtonVisibility() {
    const fixedBuyButton = document.getElementById('fixed-buy-button');
    const reviewModal = document.getElementById('review-modal');
    const loadingOverlay = document.getElementById('loading-overlay');
    const flavorSelect = document.querySelector('.flavor-select');

    if (!fixedBuyButton) return;

    const shouldHide =
        (reviewModal && !reviewModal.classList.contains('hidden')) ||
        (loadingOverlay && !loadingOverlay.classList.contains('hidden'));

    if (shouldHide) {
        fixedBuyButton.classList.add('opacity-0', 'pointer-events-none');
    } else {
        const reviewsSection = document.getElementById('reviews');
        const reviewsRect = reviewsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only show if we're not at the bottom of reviews section
        if (reviewsRect.bottom > windowHeight) {
            fixedBuyButton.classList.remove('opacity-0', 'pointer-events-none');

            // Update button state based on flavor selection
            if (!flavorSelect || !flavorSelect.value) {
                fixedBuyButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                fixedBuyButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }
}

// Initialize flavor selector and button handlers
document.addEventListener('DOMContentLoaded', function() {
    const flavorSelect = document.querySelector('.flavor-select');
    const fixedBuyButton = document.getElementById('fixed-buy-button');

    if (flavorSelect && fixedBuyButton) {
        // Initial state
        updateFloatingButtonVisibility();

        // Update on flavor change
        flavorSelect.addEventListener('change', function() {
            updateFloatingButtonVisibility();
        });

        // Add click handler to fixed buy button
        fixedBuyButton.addEventListener('click', handleBuyButtonClick);
    }

    // Existing event listeners...
    window.addEventListener('scroll', updateFloatingButtonVisibility);
});

// Product gallery images for the description section
const productGalleryImages = [
    'https://www.gsuplementos.com.br/upload/produto/layout/185/image01-interna.webp',
    'https://www.gsuplementos.com.br/upload/produto/layout/72/produto1-mono-250-v3.webp',
    'https://www.gsuplementos.com.br/upload/produto/layout/1500/haze-hardcore-pre-workout-growth-v3.webp',
    'https://www.gsuplementos.com.br/upload/produto/layout/107/produto-principal-v2.webp',
];

// Add description gallery slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('gallery-container');
    const galleryDots = document.getElementById('gallery-dots');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    let currentGalleryIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    if (galleryContainer && galleryDots) {
        // Create and append images and dots
        productGalleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Product Image ${index + 1}`;
            img.className = 'absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out';
            img.style.opacity = index === 0 ? '1' : '0';
            galleryContainer.appendChild(img);

            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-primary w-4' : 'bg-gray-300'}`;
            dot.addEventListener('click', () => updateGallery(index));
            galleryDots.appendChild(dot);
        });

        function updateGallery(index) {
            const images = galleryContainer.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.opacity = i === index ? '1' : '0';
            });
            const dots = galleryDots.querySelectorAll('button');
            dots.forEach((dot, i) => {
                dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-primary w-4' : 'bg-gray-300'}`;
            });
            currentGalleryIndex = index;
        }

        // Add touch event listeners
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    const newIndex = (currentGalleryIndex + 1) % productGalleryImages.length;
                    updateGallery(newIndex);
                } else {
                    // Swipe right - previous image
                    const newIndex = (currentGalleryIndex - 1 + productGalleryImages.length) % productGalleryImages.length;
                    updateGallery(newIndex);
                }
            }
        }

        // Add navigation button handlers
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentGalleryIndex - 1 + productGalleryImages.length) % productGalleryImages.length;
            updateGallery(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentGalleryIndex + 1) % productGalleryImages.length;
            updateGallery(newIndex);
        });

        // Auto advance slides
        setInterval(() => {
            const newIndex = (currentGalleryIndex + 1) % productGalleryImages.length;
            updateGallery(newIndex);
        }, 5000);
    }
});

// Initialize flavor selector
document.addEventListener('DOMContentLoaded', function() {
    const flavorSelect = document.querySelector('.flavor-select');
    if (flavorSelect) {
        // Clear existing options
        flavorSelect.innerHTML = '';

        // Add Natural as first option
        const naturalOption = document.createElement('option');
        naturalOption.value = 'Natural';
        naturalOption.textContent = 'Natural';
        flavorSelect.appendChild(naturalOption);

        // Add all other flavors
        Object.keys(FLAVOR_CHECKOUT_URLS)
            .filter(flavor => flavor !== 'Natural')
            .forEach(flavor => {
                const option = document.createElement('option');
                option.value = flavor;
                option.textContent = flavor;
                flavorSelect.appendChild(option);
            });
    }
});

// Close menus when clicking outside
document.addEventListener('click', function(e) {
    const sideMenu = document.getElementById('side-menu');
    const cartSidebar = document.getElementById('cart-sidebar');

    if (!e.target.closest('#side-menu') && !e.target.closest('button')) {
        sideMenu.classList.add('-translate-x-full');
    }

    if (!e.target.closest('#cart-sidebar') && !e.target.closest('button')) {
        cartSidebar.classList.add('translate-x-full');
    }
});