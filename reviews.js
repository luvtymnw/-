document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.review-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = this.querySelector('textarea').value;
            const rating = this.querySelector('.rating-select').value;
            
            if (text.trim()) {
                const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                const reviewHTML = `
                <div class="review">
                    <p class="review-author">Вы ${stars}</p>
                    <p class="review-text">${text}</p>
                </div>`;
                
                this.previousElementSibling.querySelector('.reviews-list').insertAdjacentHTML('beforeend', reviewHTML);
                this.querySelector('textarea').value = '';
                this.querySelector('.rating-select').value = '5';
                
                // Можно добавить здесь AJAX-запрос для сохранения отзыва на сервере
            }
        });
    });
});