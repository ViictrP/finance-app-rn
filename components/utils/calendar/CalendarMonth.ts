export type CalendarMonth = {
	calendarIndex: number;
	arrayIndex: number;
	previous: number;
	next: number;
	internacional: {
		ptBr: string,
		enUS: string
	}
}

export type CalendarMonths = Array<CalendarMonth>;

export const JANUARY: CalendarMonth = {
	calendarIndex: 1,
	arrayIndex: 0,
	previous: 12,
	next: 2,
	internacional: {
		ptBr: 'Janeiro',
		enUS: 'January'
	}
};

export const FEBRUARY: CalendarMonth = {
	calendarIndex: 2,
	arrayIndex: 1,
	previous: 1,
	next: 3,
	internacional: {
		ptBr: 'Fevereiro',
		enUS: 'February'
	}
};

export const MARCH: CalendarMonth = {
	calendarIndex: 3,
	previous: 2,
	arrayIndex: 2,
	next: 4,
	internacional: {
		ptBr: 'Março',
		enUS: 'March'
	}
};

export const APRIL: CalendarMonth = {
	calendarIndex: 4,
	previous: 3,
	arrayIndex: 3,
	next: 5,
	internacional: {
		ptBr: 'Abril',
		enUS: 'April'
	}
};

export const MAY: CalendarMonth = {
	calendarIndex: 5,
	previous: 4,
	arrayIndex: 4,
	next: 6,
	internacional: {
		ptBr: 'Maio',
		enUS: 'May'
	}
};

export const JUNE: CalendarMonth = {
	calendarIndex: 6,
	previous: 5,
	arrayIndex: 5,
	next: 7,
	internacional: {
		ptBr: 'Junho',
		enUS: 'June'
	}
};

export const JULY: CalendarMonth = {
	calendarIndex: 7,
	previous: 6,
	arrayIndex: 6,
	next: 8,
	internacional: {
		ptBr: 'Julho',
		enUS: 'July'
	}
};

export const AUGUST: CalendarMonth = {
	calendarIndex: 8,
	previous: 7,
	arrayIndex: 7,
	next: 9,
	internacional: {
		ptBr: 'Agosto',
		enUS: 'August'
	}
};

export const SEPTEMBER: CalendarMonth = {
	calendarIndex: 9,
	previous: 8,
	arrayIndex: 8,
	next: 10,
	internacional: {
		ptBr: 'Setembro',
		enUS: 'September'
	}
};

export const OCTOBER: CalendarMonth = {
	calendarIndex: 10,
	previous: 9,
	arrayIndex: 9,
	next: 11,
	internacional: {
		ptBr: 'Outubro',
		enUS: 'Outubro'
	}
};

export const NOVEMBER: CalendarMonth = {
	calendarIndex: 11,
	previous: 10,
	arrayIndex: 10,
	next: 12,
	internacional: {
		ptBr: 'Novembro',
		enUS: 'November'
	}
};

export const DECEMBER: CalendarMonth = {
	calendarIndex: 12,
	previous: 11,
	arrayIndex: 11,
	next: 1,
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
