# Apple Watch Clone

This repository contains a clone of the Apple Watch customization experience built with modern web technologies.

## **Tech Stack**

- **Next.js**: A React framework for building optimized and scalable web applications.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs efficiently.
- **Swiper.js**: A modern touch slider library for building interactive carousels.

## **Project Structure**

The project is structured into logical directories for better maintainability and scalability:

### **Folder Structure**

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppleWatchSe.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HermesSeries.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── SeriesTen.jsx
│   │   ├── CaseSlide.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Navigation.jsx
│   │   ├── SaveShare.jsx
│   │   ├── ShareModal.jsx
│   │   ├── SizeSlide.jsx
│   │   ├── StrapSlide.jsx
│   ├── Context/
│   │   ├── ActiveIndex/
│   │   │   ├── ActiveIndexContext.js
│   │   ├── Dropdown/
│   │   │   ├── DropdownContext.js
│   │   │   ├── useDropdown.js
│   │   ├── WatchSelect/
│   │   │   ├── WatchSelectContext.js
│   ├── pages/
│   │   ├── HomeScreen.jsx
├── utils/
│   ├── shared/
│   │   ├── constants.js
│   ├── data/
│   │   ├── BandData.js
│   │   ├── hermesData.js
│   │   ├── SpecialEditionData.js
```

## **Setup Instructions**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/apple_watch_clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd apple_watch_clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

5. Build the project for production:

   ```bash
   npm run build
   ```

6. Start the production server:
   ```bash
   npm start
   ```

## **Features**

- **Dynamic Strap Selection**: Users can choose from different straps with smooth Swiper.js carousels.
- **Responsive Design**: Tailored layouts for different screen sizes, ensuring a great experience on any device.
- **Context API Integration**: Efficient state management using React Context for strap selection and active index handling.
- **Reusable Components**: Modular and reusable components like `Dropdown`, `Navigation`, and `Loading`.
- **Optimized Assets**: Using `next/image` for optimized image rendering and lazy loading.

## **Libraries and Tools Used**

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: For utility-first styling.
- **Swiper.js**: To create interactive carousels.
- **html2canvas**: For generating screenshots of the customized Apple Watch.

## **Available Scripts**

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Starts the production server.
- `npm run lint`: Lints the codebase to ensure code quality.

## **Future Enhancements**

- **Authentication**: Add user authentication and profile management.
- **Backend Integration**: Connect to a backend API for persisting customization data.
- **Enhanced UI/UX**: Include animations and additional customization options.
- **Performance Optimizations**: Leverage caching and other optimization techniques for faster performance.


**Author**: Your Name ([bamitesh520@gmail.com](mailto:bamitesh520@gmail.com))
