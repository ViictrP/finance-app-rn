export type CalendarMonth = {
	index: number;
	previous: number;
	next: number;
	internacional: {
		ptBr: string,
		enUS: string
	}
}

export type CalendarMonths = Array<CalendarMonth>;

export const JANUARY: CalendarMonth = {
	index: 0,
	previous: 11,
	next: 1,
	internacional: {
		ptBr: 'Janeiro',
		enUS: 'January'
	}
};

export const FEBRUARY: CalendarMonth = {
	index: 1,
	previous: 0,
	next: 2,
	internacional: {
		ptBr: 'Fevereiro',
		enUS: 'February'
	}
};

export const MARCH: CalendarMonth = {
	index: 2,
	previous: 1,
	next: 3,
	internacional: {
		ptBr: 'Março',
		enUS: 'March'
	}
};

export const APRIL: CalendarMonth = {
	index: 3,
	previous: 2,
	next: 4,
	internacional: {
		ptBr: 'Abril',
		enUS: 'April'
	}
};

export const MAY: CalendarMonth = {
	index: 4,
	previous: 3,
	next: 5,
	internacional: {
		ptBr: 'Maio',
		enUS: 'May'
	}
};

export const JUNE: CalendarMonth = {
	index: 5,
	previous: 4,
	next: 6,
	internacional: {
		ptBr: 'Junho',
		enUS: 'June'
	}
};

export const JULY: CalendarMonth = {
	index: 6,
	previous: 5,
	next: 7,
	internacional: {
		ptBr: 'Julho',
		enUS: 'July'
	}
};

export const AUGUST: CalendarMonth = {
	index: 7,
	previous: 6,
	next: 8,
	internacional: {
		ptBr: 'Agosto',
		enUS: 'August'
	}
};

export const SEPTEMBER: CalendarMonth = {
	index: 8,
	previous: 7,
	next: 9,
	internacional: {
		ptBr: 'Setembro',
		enUS: 'September'
	}
};

export const OCTOBER: CalendarMonth = {
	index: 9,
	previous: 8,
	next: 10,
	internacional: {
		ptBr: 'Outubro',
		enUS: 'Outubro'
	}
};

export const NOVEMBER: CalendarMonth = {
	index: 10,
	previous: 9,
	next: 11,
	internacional: {
		ptBr: 'Novembro',
		enUS: 'November'
	}
};

export const DECEMBER: CalendarMonth = {
	index: 11,
	previous: 10,
	next: 0,
	internacional: {
		ptBr: 'Dezembro',
		enUS: 'December'
	}
};

export const MONTHS: CalendarMonths = [
	JANUARY,
	FEBRUARY,
	MARCH,
	APRIL,
	MAY,
	JUNE,
	JULY,
	AUGUST,
	SEPTEMBER,
	OCTOBER,
	NOVEMBER,
	DECEMBER
];
