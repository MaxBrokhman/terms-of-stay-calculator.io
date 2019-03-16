//get-counted-date.js
const currentDate = new Date();
const HALF_YEAR_AGO = currentDate.getDate() - 180;
const formattedDate = new Intl.DateTimeFormat("ru").format(currentDate.setDate(HALF_YEAR_AGO));
export default () => {
    const currentDateSpans = document.querySelectorAll('.date--counted');
	currentDateSpans.forEach(span => {
		span.textContent = formattedDate;
	});
};
    
