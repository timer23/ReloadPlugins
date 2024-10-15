/**
 * @name ReloadPlugins
 * @description Adds a button for reloading all BetterDiscord plugins.
 * @version 2.0
 * @author tiMer
 * @source https://github.com/timer23/ReloadPlugins
 * @updateUrl https://github.com/timer23/ReloadPlugins/raw/main/ReloadPlugins.plugin.js
 */

module.exports = class ReloadPlugins {
  start() {
    this.pluginId = "ReloadPlugins"; // ID вашего плагина
    this.addReloadButton();
  }

  stop() {
    this.removeReloadButton();
  }

  // Функция для перезагрузки всех плагинов, кроме себя
  reloadAllPlugins() {
    const pluginModule = BdApi.Plugins;
    const plugins = pluginModule.getAll();

    plugins.forEach((plugin) => {
      if (plugin.id !== this.pluginId) {
        // Исключаем перезагрузку своего плагина
        pluginModule.disable(plugin.id);
        pluginModule.enable(plugin.id);
      }
    });

    BdApi.showToast("All plugins have been reloaded!", { type: "success" });
  }

  // Добавляем кнопку перезагрузки плагинов
  addReloadButton() {
    const intervalId = setInterval(() => {
      // Ищем блок с классом "footer_aa1bff", который содержит кнопку "Путешествие"
      const footer = document.querySelector(".footer_aa1bff");

      if (footer) {
        // Создаем новый контейнер для нашей кнопки
        const newContainer = document.createElement("div");
        newContainer.className = "listItem_c96c45"; // Используем те же классы, чтобы сохранить стили

        // Создаем новую кнопку для перезагрузки плагинов
        const reloadButton = document.createElement("div");
        reloadButton.setAttribute("role", "button");
        reloadButton.setAttribute("aria-label", "Перезагрузить плагины");
        reloadButton.className = " customReloadButton"; // Добавляем кастомный класс

        // Создаем блок с классом pill_db6521 и вложенными элементами
        const pillWrapper = document.createElement("div");
        pillWrapper.className = "pill_db6521";
        const innerWrapper = document.createElement("div");
        innerWrapper.className = "wrapper_c4cd66";
        innerWrapper.setAttribute("aria-hidden", "true");
        const span = document.createElement("span");
        span.className = "item_c4cd66";
        span.style.opacity = "0"; // Скрываем по умолчанию
        span.style.height = "20px";
        span.style.transform = "none";
        span.style.transition = "opacity 0.3s ease"; // Добавляем анимацию перехода

        // Добавляем hover-эффект
        newContainer.onmouseover = () => {
          span.style.opacity = "1"; // Показываем при наведении
        };
        newContainer.onmouseout = () => {
          span.style.opacity = "0"; // Скрываем, когда курсор уходит
        };
        newContainer.onmousedown = () => {
          span.style.height = "40px";
        };
        newContainer.onmouseup = () => {
          span.style.height = "20px";
        };

        // Добавляем span внутрь innerWrapper, а затем внутрь pillWrapper
        innerWrapper.appendChild(span);

        pillWrapper.appendChild(innerWrapper);

        // Добавляем кнопку перезагрузки плагинов (предыдущая логика)
        const tooltipContainer = document.createElement("div");
        tooltipContainer.className = "layerContainer_cd0de5";

        // Внутренний блок подсказки
        const tooltipLayer = document.createElement("div");
        tooltipLayer.className =
          "theme-dark images-dark layer_cd0de5 disabledPointerEvents_cd0de5";
        tooltipLayer.style.position = "absolute"; // Позиционирование по кнопке

        // Блок для самой подсказки
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip_b6c360 tooltipRight_b6c360 tooltipPrimary_b6c360 tooltipDisablePointerEvents_b6c360 listItemTooltip_dfb2f8";
        tooltip.style.opacity = "0"; // Скрыта по умолчанию
        tooltip.style.transform = "none";

        // Добавляем стрелки подсказки
        const tooltipPointerBg = document.createElement("div");
        tooltipPointerBg.className =
          "tooltipPointer_b6c360 tooltipPointerBg_b6c360";
        tooltipPointerBg.style.top = "calc(50% + 0px)";

        const tooltipPointer = document.createElement("div");
        tooltipPointer.className = "tooltipPointer_b6c360";
        tooltipPointer.style.top = "calc(50% + 0px)";

        // Добавляем текст подсказки
        const tooltipContent = document.createElement("div");
        tooltipContent.className = "tooltipContent_b6c360";
        tooltipContent.innerText = "Перезагрузить все плагины"; // Текст подсказки

        // Собираем подсказку
        tooltip.appendChild(tooltipPointerBg);
        tooltip.appendChild(tooltipPointer);
        tooltip.appendChild(tooltipContent);

        // Добавляем в слой подсказки
        tooltipLayer.appendChild(tooltip);

        // Добавляем в основной контейнер
        tooltipContainer.appendChild(tooltipLayer);

        // Добавляем событие наведения для показа подсказки
        reloadButton.onmouseover = () => {
          const rect = reloadButton.getBoundingClientRect(); // Получаем координаты кнопки
          tooltipLayer.style.left = `${
            rect.left + window.scrollX + reloadButton.offsetWidth + 20
          }px`; // Позиция по горизонтали
          tooltipLayer.style.top = `${
            rect.top +
            window.scrollY +
            reloadButton.offsetHeight / 2 -
            tooltipLayer.offsetHeight / 2
          }px`; // Позиция по вертикали

          tooltip.style.opacity = "1"; // Показываем подсказку при наведении
          tooltip.style.transition = "opacity 0.2s ease";
        };

        reloadButton.onmouseout = () => {
          tooltip.style.opacity = "0"; // Скрываем подсказку при уходе мыши
        };

        // Теперь находим контейнер с классом "notAppAsidePanel_bd26cc"
        const asidePanel = document.querySelector(".notAppAsidePanel_bd26cc");

        if (asidePanel) {
          // Добавляем контейнер с подсказкой внутрь этого контейнера
          asidePanel.appendChild(tooltipContainer);
        } else {
          console.error("Контейнер notAppAsidePanel_bd26cc не найден.");
        }

        // Добавляем SVG иконку для новой кнопки
        reloadButton.innerHTML = `
                    <svg height="24px" width="24px" viewBox="0 0 473.677 473.677" xmlns="http://www.w3.org/2000/svg">
                        <path style="fill:#313338;" fill-opacity="0" d="M473.677,236.842c0-130.814-106.036-236.838-236.835-236.838C106.036,0.004,0,106.032,0,236.842 c0,130.795,106.036,236.831,236.842,236.831C367.641,473.673,473.677,367.637,473.677,236.842z"/>
                        <g>
                            <path style="fill:#FFFFFF;" d="M414.449,297.547c-17.243-27.052-34.494-54.108-51.741-81.156c-2.909-4.57-9.218-4.458-12.12,0.045 c-17.374,26.966-34.756,53.936-52.133,80.902c-1.881,2.917-1.245,5.733,0.52,7.681c1.092,1.653,2.909,2.831,5.505,2.838 c9.151,0.022,18.301,0.045,27.448,0.067c-42.22,67.081-144.695,73.228-192.797,4.342c-15.407-22.06-51.86-0.995-36.293,21.304 c33.963,48.633,89.746,76.474,149.359,69.65c57.361-6.57,103.657-43.663,126.644-95.18c9.835,0.026,19.674,0.049,29.513,0.075 C413.537,308.126,417.366,302.12,414.449,297.547z"/>
                            <path style="fill:#FFFFFF;" d="M370.457,138.899c-33.97-48.633-89.75-76.478-149.366-69.65 c-57.933,6.63-104.547,44.43-127.288,96.761c-12.232-0.03-24.476-0.06-36.708-0.09c-5.187-0.015-9.02,5.987-6.099,10.561 c17.243,27.052,34.49,54.108,51.733,81.16c2.913,4.566,9.218,4.454,12.124-0.045c17.374-26.97,34.759-53.936,52.133-80.902 c1.877-2.917,1.245-5.729-0.512-7.677c-1.092-1.653-2.909-2.835-5.508-2.842c-6.847-0.015-13.694-0.034-20.545-0.049 c41.599-68.55,145.267-75.322,193.744-5.92C349.572,182.259,386.029,161.194,370.457,138.899z"/>
                        </g>
                    </svg>`;

        // Добавляем обработчик клика на кнопку
        reloadButton.onclick = () => this.reloadAllPlugins();

        // Вставляем кнопку в новый контейнер
        newContainer.appendChild(pillWrapper);
        newContainer.appendChild(reloadButton);

        // Вставляем новый контейнер **перед** элементом footer
        footer.parentElement.insertBefore(newContainer, footer);

        clearInterval(intervalId); // Останавливаем интервал после успешной вставки
        this.reloadButton = newContainer;

        // Добавляем стили для кастомной кнопки, похожие на оригинальные
        const style = document.createElement("style");
        style.innerHTML = `
                    .customReloadButton {
                        width: 46px;
                        height: 46px;
                        margin-bottom:15px;
                        background: #313338 !important;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%; /* Скругляем кнопку */
                        transition: background-color 0.1s ease, transform 0.3s ease;
                    }

                    .customReloadButton:hover {
                    border-radius: 30%; /* Скругляем кнопку */
                        background: #23a559 !important; /* Цвет при наведении */
                        transform: scale(1.05); /* Увеличение при наведении */
                    }
                
                      .customReloadButton svg:hover {
                        width: 24px;
                        height: 24px;
                        fill: #23a559;
                    }

                    .customReloadButton svg {
                        width: 24px;
                        height: 24px;
                        fill: #FFFFFF;
                    }

                    .customReloadButton.selected {
                        background-color: #4752C4; /* Цвет при выборе */
                    }

                    .customReloadButton:active {
                        transform: scale(0.95); /* Эффект "нажатия" */
                    }
                `;
        document.head.appendChild(style);
      }
    }, 1000); // Проверяем каждую секунду
  }

  // Удаляем кнопку при остановке плагина
  removeReloadButton() {
    if (this.reloadButton) {
      this.reloadButton.remove();
      this.reloadButton = null;
    }
  }
};
