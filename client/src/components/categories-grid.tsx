export interface Category {
  name: string;
  icon: any;
  description?: string;
}

export interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid(
    {categories}: CategoriesGridProps,
) {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre la amplia variedad de productos que puedes alquilar a través de nuestra plataforma
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isLastCard = index === categories.length - 1;
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  isLastCard ? 'border-2 border-dashed border-gray-300 hover:border-primary' : ''
                }`}
              >
                <div className="mb-4 flex justify-center">
                  <IconComponent 
                    className={`w-12 h-12 transition-colors duration-300 ${
                      isLastCard 
                        ? 'text-gray-400 group-hover:text-primary' 
                        : 'text-gray-700 group-hover:text-primary'
                    }`}
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  {category.name}
                </h4>
                {category.description && (
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}