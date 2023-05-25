import { App } from 'vue';
import {
  Button,
  Tabbar,
  TabbarItem,
  Uploader,
  Tab,
  Tabs,
  NavBar,
  Lazyload,
  Dialog,
  Field,
  CellGroup,
  Popup,
  List,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Swipe,
  Stepper,
  SwipeItem,
  Popover,
} from 'vant';

const Vant = {
  install: (app: App): void => {
    app.use(Button);
    app.use(Tabbar);
    app.use(TabbarItem);
    app.use(Uploader);
    app.use(Tab);
    app.use(Tabs);
    app.use(NavBar);
    app.use(Lazyload);
    app.use(Dialog);
    app.use(Field);
    app.use(CellGroup);
    app.use(Popup);
    app.use(List);
    app.use(Collapse);
    app.use(CollapseItem);
    app.use(DropdownMenu);
    app.use(DropdownItem);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Stepper);
    app.use(Popover);
    app.use(Lazyload, {
      lazyComponent: true,
    });
  },
};
export default Vant;
