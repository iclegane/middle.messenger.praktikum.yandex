import {ChatPage} from "../../blocks/ChatPage";
import {renderDOM} from "../../utils/renderDOM";

document.addEventListener('DOMContentLoaded', () => {
    const page = new ChatPage({
        navigation: {
            link: {
                label: 'Профиль',
                href: '/pages/profile/',
                classes: 'navigation-panel__link',
            }
        },
        search:{
            input:{
                type:'text',
                name:'search',
                classes: 'gray-theme-input',
                display_name: 'Поиск',
                value:'',
                required: false,
            }
        },
        messages: {
            items:[{
                name: 'Андрей',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: '10:49',
                    preview_text: 'Изображение',
                    notification: {
                        count: 4,
                    }
                }
            }, {
                name: 'Киноклуб',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: '12:00',
                    preview_text: 'стикер',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: 'Илья',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: '15:12',
                    preview_text: 'Друзья, у меня для вас особенный выпуск новостей!...',
                    notification: {
                        count: 4,
                    }
                }
            }, {
                name: 'Вадим',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: 'Пт',
                    preview_text: 'Круто!',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: 'тет-а-теты',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: 'Ср',
                    preview_text: 'И Human Interface Guidelines и Material Design рекомендуют...',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: '1, 2, 3',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: 'Пн',
                    preview_text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: 'Design Destroyer',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: 'Пн',
                    preview_text: 'В 2008 году художник Jon Rafman  начал собирать...',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: 'Day.',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: '1 Мая 2020',
                    preview_text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
                    notification: {
                        count: null,
                    }
                }
            }, {
                name: 'Стас Рогозин',
                avatar: {
                    src: null,
                },
                message: {
                    delivery_time: '12 Апр 2020',
                    preview_text: 'Можно или сегодня или завтра вечером.',
                    notification: {
                        count: null,
                    }
                }
            }]
        },
        footer_actions: {
            label: 'Вложения',
            position: 'top',
            items: [{
                    label: 'Фото или Видео',
                },{
                    label: 'Файл',
                },{
                    label: 'Локация',
                },
            ]
        },
        header_actions: {
            label: 'Изменить',
            position: 'bottom',
            items: [{
                label: 'Добавить пользователя',
            }, {
                label: 'Удалить пользователя',
            }]
        },
        dialog: {
            groups: [{
                date: '10:49',
                messages: [{
                    message_type: 'text',
                    delivery_time:'10:49',
                    status: 'received',
                    isOwner: false,
                    attachments: {
                        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                            '<br>\n' +
                            'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.\n',
                    }
                }, {
                    message_type: 'text',
                    delivery_time:'10:49',
                    status: 'send',
                    isOwner: true,
                    meta:'read',
                    attachments: {
                        text: 'Круто'
                    }
                }]
            }]
        }
    });

    renderDOM('#root', page);
})