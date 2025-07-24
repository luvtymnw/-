document.addEventListener('DOMContentLoaded', function() {
    // Загрузка всех отзывов при открытии страницы
    loadReviews();

    // Обработка отправки формы
    document.querySelectorAll('.review-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const attractionId = this.closest('.attraction').querySelector('h2').textContent;
            const text = this.querySelector('textarea').value.trim();
            const rating = this.querySelector('.rating-select').value;
            
            if (text) {
                addReview(attractionId, text, rating);
                this.querySelector('textarea').value = '';
                this.querySelector('.rating-select').value = '5';
            }
        });
    });
});

function addReview(attractionId, text, rating) {
    // Получаем текущие отзывы из localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    
    // Создаем массив для достопримечательности, если его нет
    if (!reviews[attractionId]) {
        reviews[attractionId] = [];
    }
    
    // Добавляем новый отзыв
    reviews[attractionId].push({
        text: text,
        rating: rating,
        date: new Date().toISOString()
    });
    
    // Сохраняем обратно в localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Обновляем отображение отзывов
    loadReviews();
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    
    // Для каждой достопримечательности на странице
    document.querySelectorAll('.attraction').forEach(attraction => {
        const attractionId = attraction.querySelector('h2').textContent;
        const reviewsList = attraction.querySelector('.reviews-list');
        
        // Очищаем текущие отзывы (кроме первого, если это пример)
        reviewsList.innerHTML = reviewsList.querySelector('.review:first-child')?.outerHTML || '';
        
        // Добавляем сохраненные отзывы
        if (reviews[attractionId]) {
            reviews[attractionId].forEach(review => {
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                const reviewHTML = `
                    <div class="review">
                        <p class="review-author">Гость ${stars}</p>
                        <p class="review-text">${review.text}</p>
                        <p class="review-date">${new Date(review.date).toLocaleString()}</p>
                    </div>`;
                reviewsList.insertAdjacentHTML('beforeend', reviewHTML);
            });
        }
        
        // Обновляем рейтинг
        updateAverageRating(attraction, attractionId, reviews);
    });
}

function updateAverageRating(attraction, attractionId, reviews) {
    if (!reviews[attractionId] || reviews[attractionId].length === 0) return;
    
    const total = reviews[attractionId].reduce((sum, review) => sum + parseInt(review.rating), 0);
    const average = (total / reviews[attractionId].length).toFixed(1);
    
    const ratingElement = attraction.querySelector('.rating');
    if (ratingElement) {
        ratingElement.textContent = `★★★★★ (${average}/5)`;
    }
}