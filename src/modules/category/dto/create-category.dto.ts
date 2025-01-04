import { CategoryType as categoryType } from "@prisma/client";

export class CreateCategoryDto {
  categoiryID?: string;
  name: string;
  description?: string;
  type: categoryType;
  icon: string;
  isActive?: boolean;
}

export class ResCreateCategoryDto {
  categoryID: string;
  name: string;
  description?: string;
  type: categoryType;
  icon?: string;
}