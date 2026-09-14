# Agency — Биллинг

Вкладка **Billing** содержит юридические реквизиты агентства и историю инвойсов. Доступна только обычным агентствам (не Uplify).

---

## Форма реквизитов

Компонент `Form` отображает две секции:

### Company information

| Поле | Описание |
|---|---|
| Name | Название компании |
| E-mail | Контактный email |
| Address | Юридический адрес |
| Phone | Телефон |

### Payment details

| Поле | Описание |
|---|---|
| Bank name | Название банка |
| Bank account name | Название банковского счёта |
| Bank account holder address | Адрес владельца счёта |
| Bank address | Адрес банка |
| Bank account number | Номер счёта |
| BIC / SWIFT code | SWIFT-код |
| Routing number | Routing number |

Данные загружаются через `GET partner/agency/billing` при переходе на вкладку. Сохранение — `POST partner/agency/billing/save`.

---

## Инвойсы

Компонент `Invoices` показывает таблицу транзакций кошелька агентства с пагинацией.

| Колонка | Описание |
|---|---|
| Date | Дата транзакции |
| Amount | Сумма |
| Invoice | Ссылка на документ |

Данные загружаются через `GET agency/wallet/transactions`.