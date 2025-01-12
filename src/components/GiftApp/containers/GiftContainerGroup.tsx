import React from 'react';
import { Product } from '@/types/product';
import GiftContainer from './GiftContainer';

interface GiftContainerGroupProps {
  container1Items: Product[];
  container2Items: Product[];
  container3Items: Product[];
  onDrop: (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => void;
  onProductClick: (product: Product) => void;
  onRemoveItem: (index: number) => void;
}

const GiftContainerGroup = ({
  container1Items,
  container2Items,
  container3Items,
  onDrop,
  onProductClick,
  onRemoveItem
}: GiftContainerGroupProps) => {
  return (
    <div className="flex flex-col gap-4 h-[600px]">
      <div className="h-[300px]">
        <GiftContainer
          items={container1Items}
          maxItems={2}
          onDrop={onDrop(0)}
          containerTitle="Pack Premium"
          className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
          onItemClick={onProductClick}
          onRemoveItem={(index) => onRemoveItem(index)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 h-[250px]">
        <GiftContainer
          items={container2Items}
          maxItems={1}
          onDrop={onDrop(1)}
          containerTitle="Pack Deluxe"
          className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
          onItemClick={onProductClick}
          onRemoveItem={(index) => onRemoveItem(index + 2)}
        />
        <GiftContainer
          items={container3Items}
          maxItems={1}
          onDrop={onDrop(2)}
          containerTitle="Pack Élégance"
          className="h-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100"
          onItemClick={onProductClick}
          onRemoveItem={(index) => onRemoveItem(index + 3)}
        />
      </div>
    </div>
  );
};

export default GiftContainerGroup;