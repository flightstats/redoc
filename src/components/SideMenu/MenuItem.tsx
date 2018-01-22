import { observer } from 'mobx-react';
import * as React from 'react';

import { ShelfIcon } from '../../common-elements/shelfs';
import { IMenuItem, OperationModel } from '../../services';
import { MenuItems } from './MenuItems';
import { MenuItemLabel, MenuItemLi, MenuItemTitle, OperationBadge } from './styled.elements';

interface MenuItemProps {
  item: IMenuItem;
  onActivate?: (item: IMenuItem) => void;
}

@observer
export class MenuItem extends React.Component<MenuItemProps> {
  activate = (evt: React.MouseEvent<HTMLElement>) => {
    this.props.onActivate!(this.props.item);
    evt.stopPropagation();
  };

  render() {
    const { item } = this.props;
    return (
      <MenuItemLi onClick={this.activate} depth={item.depth}>
        {item.type === 'operation' ? (
          <OperationMenuItemContent item={item as OperationModel} />
        ) : (
          <MenuItemLabel depth={item.depth} active={item.active}>
            <MenuItemTitle title={item.name}>{item.name}</MenuItemTitle>
            {(item.depth > 0 &&
              item.items.length > 0 && (
                <ShelfIcon float={'right'} direction={item.active ? 'down' : 'right'} />
              )) ||
              null}
          </MenuItemLabel>
        )}
        {item.items.length > 0 && (
          <MenuItems active={item.active} items={item.items} onActivate={this.props.onActivate} />
        )}
      </MenuItemLi>
    );
  }
}

export interface OperationMenuItemContentProps {
  item: OperationModel;
}

@observer
class OperationMenuItemContent extends React.Component<OperationMenuItemContentProps> {
  render() {
    const { item } = this.props;
    return (
      <MenuItemLabel depth={item.depth} active={item.active} deprecated={item.deprecated}>
        <OperationBadge type={item.httpVerb} />
        <MenuItemTitle width="calc(100% - 32px)">{item.name}</MenuItemTitle>
      </MenuItemLabel>
    );
  }
}
