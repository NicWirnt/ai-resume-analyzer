import {twMerge} from "tailwind-merge";
import clsx, {type ClassValue} from "clsx";

export const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateUUID = () => crypto.randomUUID();

export function cn(...inputs:ClassValue[]){
  return twMerge(clsx(inputs))
}